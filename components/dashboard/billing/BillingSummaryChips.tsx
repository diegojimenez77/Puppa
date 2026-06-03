import type { BillingData } from '@/lib/billing/get-billing-data';
import { formatBillingInterval } from '@/lib/billing/plans';

interface Props {
  billing: BillingData;
}

export default function BillingSummaryChips({ billing }: Props) {
  const chips = [
    {
      icon: 'sync',
      label: 'Billing cycle',
      value: billing.interval ? formatBillingInterval(billing.interval) : '—',
    },
    {
      icon: 'payments',
      label: 'Next charge',
      value: billing.nextChargeAmount ?? '—',
    },
    {
      icon: 'verified',
      label: 'Member since',
      value: billing.memberSince ?? '—',
    },
  ];

  if (!billing.hasActiveSubscription) return null;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {chips.map(({ icon, label, value }) => (
        <div
          key={label}
          className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>
            <p className="label-sm text-on-surface-variant">{label}</p>
          </div>
          <p className="text-sm font-semibold text-on-surface leading-snug">{value}</p>
        </div>
      ))}
    </section>
  );
}
