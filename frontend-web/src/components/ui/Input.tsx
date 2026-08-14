import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-xs font-semibold tracking-wider text-stone-600 uppercase">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-3.5 py-2 text-sm bg-stone-100/50 border border-stone-200 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all ${
            error ? 'border-red-400 focus:ring-red-300' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';