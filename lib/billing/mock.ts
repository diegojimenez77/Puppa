import type { InvoiceRow, PaymentMethodInfo } from '@/lib/billing/get-billing-data'

export function isMockBillingCustomer(customerId: string | null | undefined): boolean {
  return Boolean(customerId?.startsWith('cus_mock_'))
}

export const MOCK_PAYMENT_METHOD: PaymentMethodInfo = {
  brand: 'visa',
  last4: '4242',
  expMonth: 12,
  expYear: 2027,
}

export const MOCK_INVOICES: InvoiceRow[] = [
  {
    id: 'in_mock_001',
    date: 'October 12, 2025',
    description: 'Pro Plan — Monthly',
    amount: '$29.00',
    status: 'paid',
    pdfUrl: null,
  },
  {
    id: 'in_mock_002',
    date: 'September 12, 2025',
    description: 'Pro Plan — Monthly',
    amount: '$29.00',
    status: 'paid',
    pdfUrl: null,
  },
  {
    id: 'in_mock_003',
    date: 'August 12, 2025',
    description: 'Pro Plan — Monthly',
    amount: '$29.00',
    status: 'paid',
    pdfUrl: null,
  },
]

export function buildMockSubscription(userId: string) {
  const now = new Date()
  const periodEnd = new Date(now)
  periodEnd.setMonth(periodEnd.getMonth() + 1)

  const priceId =
    process.env.STRIPE_PRICE_PRO_MONTHLY ??
    process.env.STRIPE_PRICE_PRO_YEARLY ??
    'price_mock_pro_monthly'

  return {
    user_id: userId,
    stripe_customer_id: 'cus_mock_dev_local',
    stripe_subscription_id: 'sub_mock_dev_local',
    stripe_price_id: priceId,
    plan_name: 'Pro',
    status: 'active',
    current_period_start: now.toISOString(),
    current_period_end: periodEnd.toISOString(),
    cancel_at_period_end: false,
    updated_at: now.toISOString(),
  }
}
