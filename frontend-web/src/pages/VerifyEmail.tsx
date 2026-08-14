import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
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
        let message = 'Failed to verify email. The link may have expired.';
        if (axios.isAxiosError(error) && error.response?.data?.detail) {
          message = error.response.data.detail;
        }
        setErrorMessage(message);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-stone-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm bg-white border border-stone-200/80 rounded-xl p-8 shadow-sm text-center flex flex-col items-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-10 h-10 text-stone-400 animate-spin mb-4" />
            <h2 className="text-lg font-medium text-stone-900">Verifying your identity</h2>
            <p className="text-sm text-stone-500 mt-2">Please wait while we validate your token...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mb-4" />
            <h2 className="text-lg font-medium text-stone-900">Verification Complete</h2>
            <p className="text-sm text-stone-500 mt-2 mb-6">
              Your tenant account is now active. You may proceed to the dashboard.
            </p>
            <Link to="/login" className="w-full">
              <Button>Sign in</Button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-10 h-10 text-red-500 mb-4" />
            <h2 className="text-lg font-medium text-stone-900">Verification Failed</h2>
            <p className="text-sm text-stone-500 mt-2 mb-6">{errorMessage}</p>
            <Link to="/register" className="w-full">
              <Button>Return to Registration</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};