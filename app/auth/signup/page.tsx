'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { createClient } from '@/lib/supabase/client';

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!fullName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    setSuccess(true);
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setError('');
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (authError) setError(authError.message);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Brand header */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest flex items-center justify-center h-16 border-b border-outline-variant px-4">
        <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
          SaaS Pro
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-12">
        <div
          className="w-full max-w-[400px] bg-surface-container-lowest rounded-xl p-8 border border-outline-variant auth-card-shadow"
        >
          {success ? (
            <div className="text-center py-4">
              <span
                className="material-symbols-outlined text-primary text-[48px] mb-4 block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mark_email_read
              </span>
              <h2 className="text-xl font-semibold text-on-surface mb-2">Check your email</h2>
              <p className="text-sm text-on-surface-variant mb-6">
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
              </p>
              <Link href="/auth/login" className="text-sm font-semibold text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              {/* Headline */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-on-surface mb-2">Create account</h1>
                <p className="text-sm text-on-surface-variant">Start your 14-day premium trial today.</p>
              </div>

              {/* Social buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  className="w-full h-12 flex items-center justify-center gap-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-medium text-on-surface">Sign Up with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuth('facebook')}
                  className="w-full h-12 flex items-center justify-center gap-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium text-on-surface">Sign Up with Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-2 mb-6">
                <div className="flex-1 border-t border-outline-variant" />
                <span className="mx-4 text-xs font-medium text-on-surface-variant">Or continue with</span>
                <div className="flex-1 border-t border-outline-variant" />
              </div>

              {/* Inline error */}
              {error && (
                <div className="mb-6 p-3 bg-error/10 border border-error/20 rounded-lg">
                  <p className="label-md text-error">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <Input
                  label="Full Name"
                  id="full_name"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />

                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />

                <Input
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  helperText="Must be at least 8 characters."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  loading={loading}
                  className="mt-2"
                >
                  Create Account
                </Button>
              </form>

              {/* Terms */}
              <p className="text-xs text-on-surface-variant text-center mt-6">
                By clicking &ldquo;Create Account&rdquo;, you agree to our{' '}
                <Link href="#" className="text-primary font-semibold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="#" className="text-primary font-semibold hover:underline">Privacy Policy</Link>.
              </p>

              {/* Login link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-on-surface-variant">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-primary font-bold hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-6 px-4">
        <div className="flex flex-col items-center gap-2 max-w-[1280px] mx-auto">
          <div className="flex gap-6">
            <Link href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-on-surface-variant opacity-70">
            © {new Date().getFullYear()} SaaS Pro Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
