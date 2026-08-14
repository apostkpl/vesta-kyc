import { apiClient } from './client';
import type { LoginInput, RegisterInput, EmailVerificationInput } from '../schemas/auth';

// Response interface matching backend Token schema
export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// Response interface matching backend UserResponse schema
export interface UserResponse {
  public_id: string;
  email: string;
  is_active: boolean;
  is_subscribed: boolean;
  created_at: string;
  profile?: {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
  };
}

export const authApi = {
  /**
   * Registers a new user account.
   * POST /auth/register
   */
  register: async (data: RegisterInput): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Authenticates user credentials and retrieves JWT token.
   * POST /auth/login (OAuth2 expects x-www-form-urlencoded)
   */
  login: async (data: LoginInput): Promise<TokenResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const response = await apiClient.post<TokenResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  /**
   * Consumes verification token to activate account.
   * POST /auth/verify-email
   */
  verifyEmail: async (data: EmailVerificationInput): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/verify-email', data);
    return response.data;
  },

  /**
   * Fetches current authenticated user profile.
   * GET /users/me
   */
  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/users/me');
    return response.data;
  },
};