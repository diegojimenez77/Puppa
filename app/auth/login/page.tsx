'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/ToastProvider';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }
    toast('Welcome back!', 'success');
    router.push('/dashboard');
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
          {/* Headline */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-on-surface mb-2">Login</h1>
            <p className="text-sm text-on-surface-variant">
              Access your professional workspace
            </p>
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
              label="Email Address"
              id="email"
              type="email"
              placeholder="alex@saaspro.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />

            {/* Password with "Forgot Password?" inline */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-on-surface">
                  Password
                </label>
                <Link href="#" className="text-xs font-semibold text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={loading}
              className="mt-2"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-8">
            <div className="flex-1 border-t border-outline-variant" />
            <span className="mx-4 text-xs font-medium text-on-surface-variant">Or continue with</span>
            <div className="flex-1 border-t border-outline-variant" />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-4">
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
              <span className="text-sm font-medium text-on-surface">Login with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuth('facebook')}
              className="w-full h-12 flex items-center justify-center gap-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-primary"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-on-surface">Login with Facebook</span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-10 text-center">
            <p className="text-sm text-on-surface-variant">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-primary font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
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
