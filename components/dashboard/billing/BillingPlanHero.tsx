import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import BillingPortalButton from '@/components/dashboard/billing/BillingPortalButton';
import type { BillingData } from '@/lib/billing/get-billing-data';
import { formatBillingInterval, statusBadgeVariant } from '@/lib/billing/plans';

interface Props {
  billing: BillingData;
}

export default function BillingPlanHero({ billing }: Props) {
  const {
    planName,
    status,
    priceDisplay,
    priceSubtext,
    interval,
    renewsOn,
    cancelsOn,
    cancelAtPeriodEnd,
    hasActiveSubscription,
    hasStripeCustomer,
    stripeCustomerId,
  } = billing;

  if (!hasActiveSubscription) {
    return (
      <section className="w-full space-y-3">
        <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Current Plan
        </h2>
        <div className="w-full p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Badge variant="default">Free Plan</Badge>
              <h3 className="text-2xl font-bold text-on-surface mt-3">Free</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                Upgrade to unlock advanced features and priority support.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-bold rounded-xl text-sm hover:brightness-110 active:scale-[0.98] transition-all shrink-0"
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const statusLabel = cancelAtPeriodEnd
    ? 'Canceling'
    : status?.replace(/_/g, ' ') ?? 'Active';

  return (
    <section className="w-full space-y-3">
      <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        Current Plan
      </h2>
      <div
        className="relative w-full overflow-hidden p-6 rounded-2xl shadow-lg text-white"
        style={{ background: 'linear-gradient(135deg, #8a33a9 0%, #a855c8 60%, #db87fd 100%)' }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />

        <div className="relative flex justify-between items-start gap-4">
          <div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Current Plan
            </span>
            <h3 className="text-3xl font-extrabold mt-2">{planName} Plan</h3>
            <p className="text-white/80 text-sm mt-1 capitalize">
              {formatBillingInterval(interval)}
            </p>
            <div className="mt-3">
              <Badge
                variant={statusBadgeVariant(status)}
                className="bg-white/20 text-white capitalize"
              >
                {statusLabel}
              </Badge>
            </div>
          </div>
          {priceDisplay && (
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold">{priceDisplay}</div>
              {priceSubtext && (
                <div className="text-[10px] opacity-80 uppercase font-bold mt-0.5">
                  {priceSubtext}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative mt-6 pt-5 border-t border-white/20 flex flex-col gap-4">
          {(renewsOn || cancelsOn) && (
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-white/70"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                calendar_today
              </span>
              <div>
                <p className="text-[10px] opacity-70 uppercase font-bold leading-none">
                  {cancelAtPeriodEnd ? 'Cancels on' : 'Renews on'}
                </p>
                <p className="text-sm font-medium">{cancelAtPeriodEnd ? cancelsOn : renewsOn}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Link
              href="/pricing"
              className="flex-1 py-3 bg-white text-primary font-bold rounded-xl shadow-md text-sm text-center hover:brightness-95 active:scale-[0.98] transition-all"
            >
              Change Plan
            </Link>
            <BillingPortalButton
              hasStripeCustomer={hasStripeCustomer}
              stripeCustomerId={stripeCustomerId}
              variant="hero"
              label="Open Stripe billing portal"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
