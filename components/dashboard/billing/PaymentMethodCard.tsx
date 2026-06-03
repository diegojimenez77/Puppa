import BillingPortalButton from '@/components/dashboard/billing/BillingPortalButton';
import type { BillingData, PaymentMethodInfo } from '@/lib/billing/get-billing-data';

interface Props {
  billing: BillingData;
}

function formatBrand(brand: string): string {
  return brand.charAt(0).toUpperCase() + brand.slice(1);
}

function PaymentMethodRow({
  paymentMethod,
  hasStripeCustomer,
  stripeCustomerId,
}: {
  paymentMethod: PaymentMethodInfo | null;
  hasStripeCustomer: boolean;
  stripeCustomerId: string | null;
}) {
  return (
    <div className="flex items-center justify-between p-5 gap-4">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined">credit_card</span>
        </div>
        <div className="min-w-0">
          {paymentMethod ? (
            <>
              <p className="font-semibold text-on-surface">
                {formatBrand(paymentMethod.brand)} ending in {paymentMethod.last4}
              </p>
              <p className="text-xs text-on-surface-variant">
                Expires {String(paymentMethod.expMonth).padStart(2, '0')}/{paymentMethod.expYear}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-on-surface">No payment method</p>
              <p className="text-xs text-on-surface-variant">
                Add a card via the Stripe billing portal
              </p>
            </>
          )}
        </div>
      </div>
      <BillingPortalButton
        hasStripeCustomer={hasStripeCustomer}
        stripeCustomerId={stripeCustomerId}
        variant="outline"
        label={paymentMethod ? 'Update' : 'Add'}
        className="shrink-0"
      />
    </div>
  );
}

export default function PaymentMethodCard({ billing }: Props) {
  const { email, paymentMethod, hasStripeCustomer, hasActiveSubscription, stripeCustomerId } =
    billing;

  if (!hasActiveSubscription && !hasStripeCustomer) return null;

  return (
    <section className="w-full space-y-3">
      <h2 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
        Payment
      </h2>
      <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        <PaymentMethodRow
          paymentMethod={paymentMethod}
          hasStripeCustomer={hasStripeCustomer}
          stripeCustomerId={stripeCustomerId}
        />
        <div className="h-px bg-outline-variant mx-5" />
        <div className="flex items-center justify-between p-5 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-on-surface">Billing email</p>
              <p className="text-xs text-on-surface-variant truncate">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
