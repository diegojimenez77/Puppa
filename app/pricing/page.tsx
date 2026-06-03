'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BillingToggle from '@/components/pricing/BillingToggle';
import PricingCard from '@/components/pricing/PricingCard';

const PLANS = [
  {
    name: 'Basic',
    monthlyPrice: 9,
    yearlyPrice: 7,
    description: 'Essential features for small teams just starting out.',
    features: ['5 Team Members', '10 GB Shared Storage', 'Basic Analytics', 'Email Support'],
    unavailable: ['Advanced Security', 'Priority Support', 'Custom API Access'],
    featured: false,
    ctaLabel: 'Get Started',
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: 'The professional choice for scaling business operations.',
    features: [
      'Unlimited Team Members',
      '100 GB Shared Storage',
      'Advanced Analytics',
      'Priority Email Support',
      'Advanced Security',
    ],
    unavailable: ['Custom API Access', 'Dedicated Account Manager'],
    featured: true,
    ctaLabel: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    monthlyPrice: null,
    yearlyPrice: null,
    description: 'Custom infrastructure and dedicated white-glove support.',
    features: [
      'Unlimited Everything',
      'Custom API Access',
      'Dedicated Account Manager',
      'SSO & SAML Security',
      'SLA Guarantee',
    ],
    unavailable: [],
    featured: false,
    ctaLabel: 'Contact Sales',
  },
] as const;

const TRUST_ITEMS = [
  { icon: 'credit_card',           label: 'Visa / Mastercard' },
  { icon: 'account_balance_wallet', label: 'Apple Pay'         },
  { icon: 'payments',              label: 'PayPal'             },
  { icon: 'encrypted',             label: 'Stripe Encrypted'  },
];

export default function PricingPage() {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCta = (planName: string, hasPrice: boolean) => {
    setError(null);

    if (!hasPrice) {
      window.location.href = 'mailto:sales@example.com';
      return;
    }

    setLoadingPlan(planName);
    const interval = isYearly ? 'year' : 'month';
    router.push(`/checkout?plan=${planName.toLowerCase()}&interval=${interval}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4 md:px-6 max-w-[1280px] mx-auto w-full">

        {/* Hero */}
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-4">
            Scalable plans for every stage
          </h1>
          <p className="text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            Choose the perfect plan to accelerate your growth. From small startups to global enterprises, we&apos;ve got you covered.
          </p>
        </section>

        {/* Billing toggle */}
        <div className="mb-10">
          <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm font-medium">
            <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-auto shrink-0 hover:opacity-70"
              aria-label="Dismiss error"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 items-start md:items-stretch">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              {...plan}
              isYearly={isYearly}
              isLoading={loadingPlan === plan.name}
              onCtaClick={() => handleCta(plan.name, plan.monthlyPrice !== null)}
            />
          ))}
        </div>

        {/* Security / trust section */}
        <section className="max-w-3xl mx-auto bg-surface-container-low rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center border border-outline-variant">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-on-surface mb-2">Secure Payment</h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              Processing handled via Stripe for maximum security. All major cards and payment methods accepted.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 opacity-50 grayscale">
              {TRUST_ITEMS.map(({ icon, label }) => (
                <span
                  key={icon}
                  className="material-symbols-outlined text-[32px]"
                  title={label}
                  aria-label={label}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <button className="w-full md:w-72 py-4 bg-inverse-surface text-surface-container-lowest flex items-center justify-center gap-3 font-bold text-sm rounded-xl hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-[20px]">lock</span>
              Pay with Stripe
            </button>
            <p className="text-center mt-2 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              256-bit AES Encryption
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
