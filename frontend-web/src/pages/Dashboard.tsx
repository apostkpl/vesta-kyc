import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-stone-200 pb-6">
          <h1 className="text-2xl font-serif text-stone-900 font-semibold tracking-tight">
            BastionAI Console
          </h1>
          <Button onClick={logout} className="!w-auto px-6 bg-stone-200 text-stone-800 hover:bg-stone-300">
            Sign out
          </Button>
        </header>

        <section className="bg-white border border-stone-200/80 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold tracking-wider text-stone-600 uppercase mb-4">
            Tenant Profile
          </h2>
          <div className="space-y-2 text-sm text-stone-800">
            <p><span className="font-medium">Account ID:</span> {user?.public_id}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p>
              <span className="font-medium">Status:</span>{' '}
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                Active
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};