import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getBillingData } from '@/lib/billing/get-billing-data';
import BillingPlanHero from '@/components/dashboard/billing/BillingPlanHero';
import BillingSummaryChips from '@/components/dashboard/billing/BillingSummaryChips';
import PaymentMethodCard from '@/components/dashboard/billing/PaymentMethodCard';
import InvoiceHistoryTable from '@/components/dashboard/billing/InvoiceHistoryTable';
import PlanOptionsStrip from '@/components/dashboard/billing/PlanOptionsStrip';
import BillingPortalButton from '@/components/dashboard/billing/BillingPortalButton';
import BillingDevTools from '@/components/dashboard/billing/BillingDevTools';

const TRUST_ITEMS = [
  { icon: 'credit_card', label: 'Visa / Mastercard' },
  { icon: 'account_balance_wallet', label: 'Apple Pay' },
  { icon: 'payments', label: 'PayPal' },
  { icon: 'encrypted', label: 'Stripe Encrypted' },
];

export default async function BillingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  const billing = await getBillingData(user.email ?? '', sub);

  const showPastDueBanner =
    billing.status === 'past_due' || billing.status === 'unpaid';

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full">
      <div className="space-y-6 w-full">

        {/* Page header */}
        <header className="space-y-3">
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Profile
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Manage Billing</h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Update your plan, payment method, and invoices.
            </p>
          </div>
        </header>

        <BillingDevTools hasActiveSubscription={billing.hasActiveSubscription} />

        {/* Past due warning */}
        {showPastDueBanner && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-error-container text-on-error-container px-5 py-4 rounded-xl text-sm">
            <div className="flex items-start gap-3 flex-1">
              <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
              <div>
                <p className="font-semibold">Payment failed</p>
                <p className="opacity-90 mt-0.5">
                  Update your payment method to keep your subscription active.
                </p>
              </div>
            </div>
            <BillingPortalButton
              hasStripeCustomer={billing.hasStripeCustomer}
              stripeCustomerId={billing.stripeCustomerId}
              variant="outline"
              label="Update Payment"
              className="shrink-0 bg-surface-container-lowest border-error/20"
            />
          </div>
        )}

        <BillingPlanHero billing={billing} />
        <BillingSummaryChips billing={billing} />
        <PaymentMethodCard billing={billing} />
        <InvoiceHistoryTable
          invoices={billing.invoices}
          hasStripeCustomer={billing.hasStripeCustomer}
          stripeCustomerId={billing.stripeCustomerId}
        />
        <PlanOptionsStrip currentPlanKey={billing.planKey} />

        {/* Secure billing footer */}
        <section className="w-full bg-surface-container-low rounded-2xl p-6 border border-outline-variant">
          <div className="flex items-start gap-3">
            <span
              className="material-symbols-outlined text-primary text-[24px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock
            </span>
            <div className="flex-1">
              <h3 className="font-bold text-on-surface mb-1">Secure billing via Stripe</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Payments are encrypted and processed by Stripe. Cancel or change your plan anytime.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 opacity-50 grayscale">
                {TRUST_ITEMS.map(({ icon, label }) => (
                  <span
                    key={icon}
                    className="material-symbols-outlined text-[28px]"
                    title={label}
                    aria-label={label}
                  >
                    {icon}
                  </span>
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-3">
                256-bit AES Encryption
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
