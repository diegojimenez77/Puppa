import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe/client'
import {
  findPlanKeyByPriceId,
  formatCurrency,
  getDisplayPrice,
  getIntervalFromPriceId,
} from '@/lib/billing/plans'
import type { Database } from '@/types/database'
import {
  isMockBillingCustomer,
  MOCK_INVOICES,
  MOCK_PAYMENT_METHOD,
} from '@/lib/billing/mock'

type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row']

export interface InvoiceRow {
  id: string
  date: string
  description: string
  amount: string
  status: string
  pdfUrl: string | null
}

export interface PaymentMethodInfo {
  brand: string
  last4: string
  expMonth: number
  expYear: number
}

export interface BillingData {
  email: string
  planName: string
  planKey: string | null
  status: string | null
  interval: 'month' | 'year' | null
  priceDisplay: string | null
  priceSubtext: string | null
  renewsOn: string | null
  cancelsOn: string | null
  cancelAtPeriodEnd: boolean
  memberSince: string | null
  nextChargeAmount: string | null
  hasActiveSubscription: boolean
  hasStripeCustomer: boolean
  stripeCustomerId: string | null
  paymentMethod: PaymentMethodInfo | null
  invoices: InvoiceRow[]
}

function formatDate(iso: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function mapInvoice(invoice: Stripe.Invoice): InvoiceRow {
  const amount = invoice.amount_due / 100
  const line = invoice.lines.data[0]
  return {
    id: invoice.id,
    date: formatDate(new Date(invoice.created * 1000).toISOString()) ?? '—',
    description: line?.description ?? invoice.description ?? 'Subscription',
    amount: formatCurrency(amount, invoice.currency),
    status: invoice.status ?? 'unknown',
    pdfUrl: invoice.invoice_pdf ?? null,
  }
}

async function fetchPaymentMethod(
  customerId: string,
): Promise<PaymentMethodInfo | null> {
  try {
    const customer = await getStripe().customers.retrieve(customerId)
    if (customer.deleted) return null

    const defaultPm = customer.invoice_settings?.default_payment_method
    const pmId =
      typeof defaultPm === 'string' ? defaultPm : defaultPm?.id ?? null

    if (pmId) {
      const pm = await getStripe().paymentMethods.retrieve(pmId)
      if (pm.card) {
        return {
          brand: pm.card.brand,
          last4: pm.card.last4,
          expMonth: pm.card.exp_month,
          expYear: pm.card.exp_year,
        }
      }
    }

    const methods = await getStripe().paymentMethods.list({
      customer: customerId,
      type: 'card',
      limit: 1,
    })
    const card = methods.data[0]?.card
    if (!card) return null
    return {
      brand: card.brand,
      last4: card.last4,
      expMonth: card.exp_month,
      expYear: card.exp_year,
    }
  } catch {
    return null
  }
}

export async function getBillingData(
  email: string,
  sub: SubscriptionRow | null,
): Promise<BillingData> {
  const planName = sub?.plan_name ?? 'Free'
  const planKey =
    findPlanKeyByPriceId(sub?.stripe_price_id ?? null) ??
    (planName !== 'Free' ? planName.toLowerCase() : null)
  const interval =
    getIntervalFromPriceId(sub?.stripe_price_id ?? null) ??
    (planKey ? ('month' as const) : null)
  const status = sub?.status ?? null
  const hasStripeCustomer = Boolean(sub?.stripe_customer_id)
  const hasActiveSubscription =
    Boolean(sub?.stripe_subscription_id) &&
    (status === 'active' || status === 'trialing' || status === 'past_due')

  let priceDisplay: string | null = null
  let priceSubtext: string | null = null

  if (planKey && interval) {
    const displayPrice = getDisplayPrice(planKey, interval)
    if (displayPrice !== null) {
      if (interval === 'year') {
        priceDisplay = formatCurrency(displayPrice)
        priceSubtext = 'per month · billed yearly'
      } else {
        priceDisplay = formatCurrency(displayPrice)
        priceSubtext = 'per month'
      }
    }
  }

  const renewsOn = formatDate(sub?.current_period_end ?? null)
  const cancelAtPeriodEnd = sub?.cancel_at_period_end ?? false
  const cancelsOn = cancelAtPeriodEnd ? renewsOn : null

  let paymentMethod: PaymentMethodInfo | null = null
  let invoices: InvoiceRow[] = []

  if (isMockBillingCustomer(sub?.stripe_customer_id)) {
    paymentMethod = MOCK_PAYMENT_METHOD
    invoices = MOCK_INVOICES
  } else if (sub?.stripe_customer_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const [pm, invoiceList] = await Promise.all([
        fetchPaymentMethod(sub.stripe_customer_id),
        getStripe().invoices.list({
          customer: sub.stripe_customer_id,
          limit: 12,
        }),
      ])
      paymentMethod = pm
      invoices = invoiceList.data.map(mapInvoice)
    } catch {
      // Stripe unavailable — show Supabase data only
    }
  }

  const nextCharge =
    planKey && interval && hasActiveSubscription
      ? getDisplayPrice(planKey, interval)
      : null

  return {
    email,
    planName,
    planKey,
    status,
    interval,
    priceDisplay,
    priceSubtext,
    renewsOn,
    cancelsOn,
    cancelAtPeriodEnd,
    memberSince: formatDate(sub?.created_at ?? null),
    nextChargeAmount:
      nextCharge !== null && renewsOn
        ? `${formatCurrency(nextCharge)} on ${renewsOn}`
        : null,
    hasActiveSubscription,
    hasStripeCustomer,
    stripeCustomerId: sub?.stripe_customer_id ?? null,
    paymentMethod,
    invoices,
  }
}
