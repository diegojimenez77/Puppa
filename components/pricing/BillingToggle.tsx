'use client';

import Toggle from '@/components/ui/Toggle';

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export default function BillingToggle({ isYearly, onToggle }: BillingToggleProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      <span className={`text-sm font-semibold transition-colors ${!isYearly ? 'text-primary' : 'text-on-surface-variant'}`}>
        Monthly
      </span>

      <Toggle
        checked={isYearly}
        onChange={onToggle}
        label="Toggle billing interval"
      />

      <span className={`text-sm font-semibold flex items-center gap-1.5 transition-colors ${isYearly ? 'text-primary' : 'text-on-surface-variant'}`}>
        Yearly
        <span className="bg-primary-fixed text-on-primary-fixed-variant px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide">
          Save 20%
        </span>
      </span>
    </div>
  );
}
