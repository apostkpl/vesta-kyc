import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, ShieldCheck } from 'lucide-react';

import { loginSchema, type LoginInput } from '../schemas/auth';
import { authApi } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const loginSuccess = useAuthStore((state) => state.loginSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      // 1. Authenticate against FastAPI backend
      const { access_token } = await authApi.login(data);

      // 2. Hydrate global Zustand auth store + fetch /users/me
      await loginSuccess(access_token);

      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (error: unknown) {
    let message = 'Failed to sign in. Check your credentials.';
    
    if (axios.isAxiosError(error) && error.response?.data?.detail) {
        message = error.response.data.detail;
    }
  toast.error(message);
}
  };

  return (
    <div className="min-h-screen w-full bg-stone-50 flex flex-col justify-center items-center p-4">
      {/* Editorial Header / Brand Mark */}
      <div className="w-full max-w-sm mb-8 flex flex-col items-center text-center">
        <div className="p-2 bg-stone-100 border border-stone-200 rounded-xl mb-4">
          <ShieldCheck className="w-6 h-6 text-stone-800" />
        </div>
        <h1 className="text-2xl font-serif text-stone-900 font-semibold tracking-tight">
          BastionAI
        </h1>
        <p className="text-xs text-stone-500 mt-1">Sovereign Identity Gateway</p>
      </div>

      {/* Main Form Blueprint */}
      <div className="w-full max-w-sm bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-medium text-stone-800 mb-6 border-b border-stone-100 pb-3">
          Sign in to your instance
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@yourdomain.local"
            error={errors.username?.message}
            {...register('username')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="mt-2">
            <Button type="submit" isLoading={isSubmitting}>
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-stone-900 underline underline-offset-4 hover:text-stone-700"
            >
              Register tenant
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};