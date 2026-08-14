import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, ShieldCheck, UserPlus } from 'lucide-react';
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
    <div className="min-h-screen w-full bg-stone-50/60 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Subtle Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Header / Brand Mark */}
      <div className="w-full max-w-sm mb-6 flex flex-col items-center text-center z-10">
        <div className="p-2.5 bg-white border border-stone-200/80 rounded-2xl mb-3 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-stone-800 stroke-[1.75]" />
        </div>
        <h1 className="text-xl font-semibold text-stone-900 tracking-tight">
          Identity Portal
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Create a new account to get started
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-sm bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm z-10 transition-all duration-200">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
          <h2 className="text-sm font-semibold text-stone-800">
            Create Account
          </h2>
          <UserPlus className="w-3.5 h-3.5 text-stone-400" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="name@company.com"
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
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full justify-center gap-2 font-medium"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-stone-900 hover:text-stone-700 underline underline-offset-4 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="mt-8 text-center text-xs text-stone-400 z-10">
        Open Source Software • Licensed under BSD-3-Clause
      </div>
    </div>
  );
};