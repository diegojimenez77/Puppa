'use client';

import { InputHTMLAttributes, ReactNode, useId, useState } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixIcon?: string;
  suffixIcon?: string;
  size?: 'md' | 'lg';
}

export default function Input({
  label,
  error,
  helperText,
  prefixIcon,
  suffixIcon,
  size = 'md',
  type = 'text',
  id: externalId,
  className = '',
  ...props
}: InputProps) {
  const autoId = useId();
  const id = externalId ?? autoId;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const heightClass = size === 'lg' ? 'h-14' : 'h-12';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="label-md text-on-surface">
          {label}
        </label>
      )}
      <div
        className={[
          'relative flex items-center rounded-lg border transition-all focus-within:ring-2',
          error
            ? 'border-error focus-within:ring-error/20'
            : 'border-outline-variant focus-within:ring-primary/20 focus-within:border-primary',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {prefixIcon && (
          <span className="pl-3 text-on-surface-variant flex-shrink-0 material-symbols-outlined text-[20px]">
            {prefixIcon}
          </span>
        )}
        <input
          id={id}
          type={inputType}
          className={[
            'flex-1 bg-transparent outline-none body-md text-on-surface placeholder:text-outline rounded-[inherit]',
            heightClass,
            prefixIcon ? 'pl-2 pr-3' : 'px-4',
            suffixIcon || isPassword ? 'pr-2' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="pr-3 text-on-surface-variant flex-shrink-0 flex items-center"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        ) : suffixIcon ? (
          <span className="pr-3 text-on-surface-variant flex-shrink-0 material-symbols-outlined text-[20px]">
            {suffixIcon}
          </span>
        ) : null}
      </div>
      {(error || helperText) && (
        <p className={`label-md ${error ? 'text-error' : 'text-on-surface-variant'}`}>
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}
