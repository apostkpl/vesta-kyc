import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import axios from 'axios';

import { registerSchema, type RegisterInput } from '../schemas/auth';
import { authApi } from '../api/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await authApi.register(data);
      toast.success('Registration successful. Please check your email to verify your account.');
      navigate('/login');
    } catch (error: unknown) {
      let message = 'Registration failed. Please try again.';
      if (axios.isAxiosError(error) && error.response?.data?.detail) {
        message = error.response.data.detail;
      }
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-stone-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm mb-8 flex flex-col items-center text-center">
        <div className="p-2 bg-stone-100 border border-stone-200 rounded-xl mb-4">
          <ShieldCheck className="w-6 h-6 text-stone-800" />
        </div>
        <h1 className="text-2xl font-serif text-stone-900 font-semibold tracking-tight">
          BastionAI
        </h1>
        <p className="text-xs text-stone-500 mt-1">Provision New Tenant Account</p>
      </div>

      <div className="w-full max-w-sm bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-medium text-stone-800 mb-6 border-b border-stone-100 pb-3">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@yourdomain.local"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              type="text"
              placeholder="Jane"
              error={errors.profile?.first_name?.message}
              {...register('profile.first_name')}
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              error={errors.profile?.last_name?.message}
              {...register('profile.last_name')}
            />
          </div>

          <div className="mt-2">
            <Button type="submit" isLoading={isSubmitting}>
              <span>Register</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-stone-900 underline underline-offset-4 hover:text-stone-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};