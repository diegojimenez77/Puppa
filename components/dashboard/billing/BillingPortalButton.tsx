'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/ToastProvider';
import { isMockBillingCustomer } from '@/lib/billing/mock';

interface Props {
  hasStripeCustomer: boolean;
  stripeCustomerId?: string | null;
  variant?: 'hero' | 'outline' | 'text';
  className?: string;
  label?: string;
}

export default function BillingPortalButton({
  hasStripeCustomer,
  stripeCustomerId = null,
  variant = 'outline',
  className = '',
  label = 'Stripe Portal',
}: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isMock = isMockBillingCustomer(stripeCustomerId);

  const handleClick = async () => {
    if (isMock) {
      toast('Mock subscription — Stripe Portal is not available in dev mode.', 'info');
      return;
    }
    if (!hasStripeCustomer) {
      toast('No billing account found. Subscribe from the Pricing page first.', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast(data.error ?? 'Could not open billing portal. Please try again.', 'error');
      }
    } catch {
      toast('Network error. Please check your connection.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const base =
    variant === 'hero'
      ? 'w-12 h-12 bg-white/20 text-white flex items-center justify-center rounded-xl hover:bg-white/30 active:scale-90 transition-all disabled:opacity-60'
      : variant === 'text'
        ? 'text-sm font-semibold text-primary hover:underline disabled:opacity-60'
        : 'px-4 py-2 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container-low active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed';

  if (variant === 'text') {
    return (
      <button type="button" onClick={handleClick} disabled={loading} className={`${base} ${className}`}>
        {loading ? 'Loading…' : label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`${base} ${className}`}
      aria-label={label}
      title={label}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
      ) : variant === 'hero' ? (
        <span className="material-symbols-outlined">open_in_new</span>
      ) : (
        label
      )}
    </button>
  );
}

export function BillingPortalLink({
  hasStripeCustomer,
  stripeCustomerId = null,
  className = '',
}: {
  hasStripeCustomer: boolean;
  stripeCustomerId?: string | null;
  className?: string;
}) {
  return (
    <BillingPortalButton
      hasStripeCustomer={hasStripeCustomer}
      stripeCustomerId={stripeCustomerId}
      variant="text"
      label="View in Stripe"
      className={className}
    />
  );
}
