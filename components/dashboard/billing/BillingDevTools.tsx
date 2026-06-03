'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/components/ui/ToastProvider';

interface Props {
  hasActiveSubscription: boolean;
}

export default function BillingDevTools({ hasActiveSubscription }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<'seed' | 'clear' | null>(null);

  if (process.env.NODE_ENV !== 'development') return null;

  const run = async (method: 'POST' | 'DELETE', action: 'seed' | 'clear') => {
    setLoading(action);
    try {
      const res = await fetch('/api/dev/seed-subscription', { method });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error ?? 'Request failed', 'error');
        return;
      }
      toast(data.message ?? 'Done', 'success');
      router.refresh();
    } catch {
      toast('Network error', 'error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <section className="w-full rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5 space-y-3">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-[22px] shrink-0">science</span>
        <div>
          <p className="font-semibold text-on-surface text-sm">Development tools</p>
          <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
            Seed a mock Pro subscription to preview this screen without Stripe checkout.
            Stripe Portal won&apos;t work with mock data — everything else will.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {!hasActiveSubscription ? (
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => run('POST', 'seed')}
            className="px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading === 'seed' ? 'Seeding…' : 'Seed mock subscription'}
          </button>
        ) : (
          <button
            type="button"
            disabled={loading !== null}
            onClick={() => run('DELETE', 'clear')}
            className="px-4 py-2 border border-outline-variant text-on-surface text-sm font-semibold rounded-lg hover:bg-surface-container-low active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {loading === 'clear' ? 'Removing…' : 'Remove mock subscription'}
          </button>
        )}
      </div>
    </section>
  );
}
