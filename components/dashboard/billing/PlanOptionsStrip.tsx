import Link from 'next/link';
import { PLAN_PRICES } from '@/lib/billing/plans';

interface Props {
  currentPlanKey: string | null;
}

const PLAN_ORDER = ['basic', 'pro', 'enterprise'] as const;

export default function PlanOptionsStrip({ currentPlanKey }: Props) {
  return (
    <section className="w-full space-y-3">
      <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        Available Plans
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PLAN_ORDER.map((key) => {
          const prices = PLAN_PRICES[key];
          const name = key.charAt(0).toUpperCase() + key.slice(1);
          const isCurrent = currentPlanKey === key;
          const price = prices.monthly;

          return (
            <div
              key={key}
              className={[
                'rounded-xl p-4 flex flex-col bg-surface-container-lowest transition-shadow',
                isCurrent
                  ? 'border-2 border-primary shadow-md'
                  : 'border border-outline-variant hover:shadow-sm',
              ].join(' ')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {name}
                </span>
                {isCurrent && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Current
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-on-surface">
                ${price}
                <span className="text-sm font-medium text-on-surface-variant">/mo</span>
              </p>
              <Link
                href={
                  isCurrent
                    ? '/pricing'
                    : key === 'enterprise'
                      ? '/pricing'
                      : `/checkout?plan=${key}&interval=month`
                }
                className={[
                  'mt-4 py-2.5 rounded-lg text-sm font-bold text-center transition-all active:scale-[0.98]',
                  isCurrent
                    ? 'border border-primary text-primary hover:bg-primary/5'
                    : 'bg-primary text-on-primary hover:brightness-110',
                ].join(' ')}
              >
                {isCurrent ? 'View Details' : key === 'enterprise' ? 'Contact' : 'Switch'}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
