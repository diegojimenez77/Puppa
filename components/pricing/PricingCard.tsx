interface PricingCardProps {
  name: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  description: string;
  features: readonly string[];
  unavailable?: readonly string[];
  featured?: boolean;
  isYearly: boolean;
  ctaLabel: string;
  isLoading?: boolean;
  onCtaClick: () => void;
}

export default function PricingCard({
  name,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  unavailable = [],
  featured = false,
  isYearly,
  ctaLabel,
  isLoading = false,
  onCtaClick,
}: PricingCardProps) {
  const price = isYearly ? yearlyPrice : monthlyPrice;

  return (
    <div
      className={[
        'relative bg-surface-container-lowest rounded-xl p-6 flex flex-col transition-shadow',
        featured
          ? 'border-2 border-primary shadow-xl md:scale-105 z-10'
          : 'border border-outline-variant hover:shadow-md',
      ].join(' ')}
    >
      {/* Most Popular badge */}
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <span
          className={`text-xs font-bold uppercase tracking-wider mb-1 block ${
            featured ? 'text-primary' : 'text-secondary'
          }`}
        >
          {name}
        </span>

        <div className="flex items-baseline gap-1 mt-2">
          {price !== null ? (
            <>
              <span className="text-3xl font-bold text-on-surface">${price}</span>
              <span className="text-sm font-medium text-on-surface-variant">/mo</span>
            </>
          ) : (
            <span className="text-3xl font-bold text-on-surface">Contact Us</span>
          )}
        </div>

        {isYearly && price !== null && (
          <p className="text-xs text-on-surface-variant mt-1">Billed ${price * 12}/year</p>
        )}

        <p className="mt-3 text-sm text-on-surface-variant leading-relaxed">{description}</p>
      </div>

      {/* Feature list */}
      <ul className="flex-grow flex flex-col gap-2.5 mb-6">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-on-surface">
            <span
              className="material-symbols-outlined text-primary text-[18px] shrink-0"
              style={featured ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              check_circle
            </span>
            {f}
          </li>
        ))}
        {unavailable.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-on-surface-variant opacity-40">
            <span className="material-symbols-outlined text-[18px] shrink-0">block</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onCtaClick}
        disabled={isLoading}
        className={[
          'w-full py-3 rounded-lg text-sm font-bold transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100',
          featured
            ? 'bg-primary text-on-primary hover:brightness-110 shadow-md'
            : 'border-2 border-primary text-primary hover:bg-surface-container-low',
        ].join(' ')}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
            Loading…
          </span>
        ) : ctaLabel}
      </button>
    </div>
  );
}
