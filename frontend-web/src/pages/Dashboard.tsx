import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { 
  ShieldCheck, 
  LogOut, 
  User, 
  Mail, 
  Fingerprint, 
  Activity, 
  KeyRound,
  Clock
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen w-full bg-stone-50/60 p-4 sm:p-8 relative overflow-hidden">
      {/* Subtle Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e4_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e4_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation / Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white border border-stone-200/80 rounded-2xl shadow-xs">
              <ShieldCheck className="w-6 h-6 text-stone-800 stroke-[1.75]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-stone-900 tracking-tight">
                Identity Console
              </h1>
              <p className="text-xs text-stone-500">
                Workspace & Access Overview
              </p>
            </div>
          </div>

          <Button
            onClick={logout}
            className="!w-auto justify-center gap-2 px-4 py-2 bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </header>

        {/* Status Metrics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-stone-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600">
              <Activity className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500">Account Status</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-stone-800">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-xl border border-stone-200 text-stone-600">
              <KeyRound className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500">Authentication</p>
              <p className="text-sm font-semibold text-stone-800 mt-0.5">JWT / OAuth2</p>
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-stone-100 rounded-xl border border-stone-200 text-stone-600">
              <Clock className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-500">Session Type</p>
              <p className="text-sm font-semibold text-stone-800 mt-0.5">Authenticated</p>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <main className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-stone-500" />
              <h2 className="text-sm font-semibold text-stone-800">
                User Details
              </h2>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              v0.1.0
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-400 flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5" />
                Public Identifier
              </label>
              <p className="text-sm font-mono bg-stone-50 border border-stone-200/60 rounded-xl px-3 py-2 text-stone-800 break-all select-all">
                {user?.public_id || 'N/A'}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-stone-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email Address
              </label>
              <p className="text-sm font-mono bg-stone-50 border border-stone-200/60 rounded-xl px-3 py-2 text-stone-800 break-all select-all">
                {user?.email || 'N/A'}
              </p>
            </div>
          </div>
        </main>

        {/* Footer info */}
        <footer className="mt-8 text-center text-xs text-stone-400">
          Protected by end-to-end encryption
        </footer>
      </div>
    </div>
  );
};