import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, type UserResponse } from '../api/auth';

interface AuthState {
  token: string | null;
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setToken: (token: string) => void;
  setUser: (user: UserResponse) => void;
  loginSuccess: (token: string) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setToken: (token: string) => {
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
      },

      setUser: (user: UserResponse) => {
        set({ user });
      },

      /**
       * Called immediately after a successful /auth/login request.
       * Saves token to state/localStorage and fetches user profile via /users/me.
       */
      loginSuccess: async (token: string) => {
        set({ isLoading: true });
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });

        try {
          const user = await authApi.getCurrentUser();
          set({ user, isLoading: false });
        } catch (error) {
          // If fetching profile fails, clear auth state
          get().logout();
          set({ isLoading: false });
          throw error;
        }
      },

      /**
       * Re-hydrates current user profile on app start if token exists.
       */
      fetchCurrentUser: async () => {
        const { token } = get();
        if (!token) return;

        set({ isLoading: true });
        try {
          const user = await authApi.getCurrentUser();
          set({ user, isAuthenticated: true, isLoading: false });
        } catch {
          get().logout();
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'bastion-auth', // key in localStorage
      partialize: (state) => ({ token: state.token }), // persist only the token
    }
  )
);