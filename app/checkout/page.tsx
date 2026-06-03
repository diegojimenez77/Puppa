'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const PLAN_INFO: Record<string, { name: string; monthlyPrice: number; yearlyPrice: number }> = {
  basic: { name: 'Basic', monthlyPrice: 9, yearlyPrice: 7 },
  pro: { name: 'Pro', monthlyPrice: 29, yearlyPrice: 23 },
  enterprise: { name: 'Enterprise', monthlyPrice: 99, yearlyPrice: 79 },
};

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; interval?: string }>;
}) {
  const { plan: planKey = 'pro', interval = 'month' } = use(searchParams);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push(`/auth/login`);
      }
    });
  }, [router]);

  const plan = PLAN_INFO[planKey] ?? PLAN_INFO['pro'];
  const isYearly = interval === 'year';
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const billingLabel = isYearly ? 'Billed yearly' : 'Billed monthly';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planKey, interval }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setIsDone(true);
      window.location.href = data.url;
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            aria-label="Go back"
            className="hover:bg-surface-container-low p-2 rounded-full transition-colors active:scale-95 text-on-surface-variant"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-xl font-bold text-primary">Complete Your Subscription</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant text-sm hidden sm:block">SaaS Pro</span>
          <span className="material-symbols-outlined text-primary">account_circle</span>
        </div>
      </header>

      <main className="flex-grow pt-24 pb-12 px-4 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left column — order summary */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-card">
              <h2 className="text-on-surface font-bold text-lg mb-4">Order Summary</h2>
              <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-container p-2 rounded-lg text-on-primary">
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{plan.name} Plan</p>
                    <p className="text-sm text-on-surface-variant">{billingLabel}</p>
                  </div>
                </div>
                <p className="font-bold text-primary">${price}/mo</p>
              </div>
              <div className="mt-6 space-y-3 pt-6 border-t border-outline-variant">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-on-surface">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Tax (0%)</span>
                  <span className="text-on-surface">$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span className="text-on-surface">Total Due</span>
                  <span className="text-primary">${price.toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Security badges */}
            <section className="flex flex-col gap-4 px-2">
              <div className="flex items-center gap-3 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-green-600 dark:text-emerald-400">verified_user</span>
                <span>Secure SSL encrypted payment processing</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant text-sm opacity-60">
                <span className="material-symbols-outlined text-[28px]">credit_card</span>
                <span className="material-symbols-outlined text-[28px]">contactless</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Powered by Stripe</span>
              </div>
            </section>
          </div>

          {/* Right column — payment form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {error && (
              <div className="mb-4 flex items-center gap-3 bg-error/10 text-error px-4 py-3 rounded-xl text-sm font-medium">
                <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                {error}
                <button onClick={() => setError(null)} className="ml-auto shrink-0" aria-label="Dismiss">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant shadow-lg space-y-6"
            >
              <h2 className="text-on-surface font-bold text-xl">Payment Details</h2>

              <div className="space-y-4">
                {/* Cardholder name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-on-surface-variant" htmlFor="cardholder">
                    Cardholder Name
                  </label>
                  <input
                    id="cardholder"
                    name="cardholder"
                    type="text"
                    placeholder="Alex Morgan"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface outline-none"
                  />
                </div>

                {/* Card information */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-on-surface-variant">
                    Card Information
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      <span className="material-symbols-outlined">credit_card</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full pl-11 pr-32 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface outline-none"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-16 bg-transparent border-none p-0 text-sm focus:ring-0 text-right outline-none text-on-surface"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-12 bg-transparent border-none p-0 text-sm focus:ring-0 text-right outline-none text-on-surface"
                      />
                    </div>
                  </div>
                </div>

                {/* Postal code */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-on-surface-variant" htmlFor="zip">
                    Postal Code
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    placeholder="90210"
                    className="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface outline-none"
                  />
                </div>

                {/* Save card */}
                <div className="flex items-center gap-3 pt-2">
                  <input
                    id="save-card"
                    type="checkbox"
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                  />
                  <label className="text-sm text-on-surface-variant" htmlFor="save-card">
                    Save card for future payments
                  </label>
                </div>
              </div>

              {/* Encryption indicator */}
              <div className="flex items-center justify-center gap-2 py-3 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface-variant">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lock
                </span>
                256-bit AES Encryption
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || isDone}
                className="w-full bg-primary hover:brightness-110 text-on-primary font-bold py-4 rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                    Processing…
                  </>
                ) : isDone ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Redirecting…
                  </>
                ) : (
                  <>
                    Pay &amp; Subscribe
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-on-surface-variant leading-relaxed">
                By clicking &ldquo;Pay &amp; Subscribe&rdquo;, you agree to SaaS Pro&apos;s{' '}
                <Link href="#" className="underline hover:text-primary">Terms of Service</Link>{' '}
                and authorize the recurring charge to your payment method. You can cancel anytime.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-8 gap-4 w-full max-w-4xl mx-auto">
          <p className="text-on-surface-variant text-sm text-center md:text-left">
            © 2024 SaaS Pro Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies', 'Contact'].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-sm text-on-surface-variant hover:text-primary transition-colors hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
