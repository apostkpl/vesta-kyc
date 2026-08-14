import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { authApi } from '../api/auth';
import { Button } from '../components/ui/Button';

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setStatus('error');
        setErrorMessage('Verification token is missing from the URL.');
        return;
      }

      try {
        await authApi.verifyEmail({ token });
        setStatus('success');
      } catch (error: unknown) {
        setStatus('error');
        let message = 'Failed to verify email. The link may have expired or is invalid.';
        if (axios.isAxiosError(error) && error.response?.data?.detail) {
          message = error.response.data.detail;
        }
        setErrorMessage(message);
      }
    };

    verifyToken();
  }, [token]);

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
          Account verification and validation
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-sm bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm text-center flex flex-col items-center z-10 transition-all duration-200">
        {status === 'loading' && (
          <div className="py-4 flex flex-col items-center">
            <Loader2 className="w-9 h-9 text-stone-400 animate-spin mb-4" />
            <h2 className="text-sm font-semibold text-stone-900">
              Validating Credentials
            </h2>
            <p className="text-xs text-stone-500 mt-1.5">
              Please wait while we verify your activation token...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-2 flex flex-col items-center w-full">
            <div className="p-2 bg-emerald-50 rounded-full mb-3 border border-emerald-100">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 stroke-[1.75]" />
            </div>
            <h2 className="text-base font-semibold text-stone-900">
              Email Verified
            </h2>
            <p className="text-xs text-stone-500 mt-1.5 mb-6 leading-relaxed">
              Your account is now active. You may proceed to sign in to access your dashboard.
            </p>
            <Link to="/login" className="w-full">
              <Button className="w-full justify-center font-medium">
                Sign In
              </Button>
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="py-2 flex flex-col items-center w-full">
            <div className="p-2 bg-red-50 rounded-full mb-3 border border-red-100">
              <XCircle className="w-8 h-8 text-red-500 stroke-[1.75]" />
            </div>
            <h2 className="text-base font-semibold text-stone-900">
              Verification Failed
            </h2>
            <p className="text-xs text-stone-500 mt-1.5 mb-6 leading-relaxed">
              {errorMessage}
            </p>
            <Link to="/register" className="w-full">
              <Button className="w-full justify-center font-medium">
                Back to Registration
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Minimal Footer */}
      <div className="mt-8 text-center text-xs text-stone-400 z-10">
        Protected by end-to-end encryption
      </div>
    </div>
  );
};