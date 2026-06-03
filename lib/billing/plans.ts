import { PLANS, type PlanInterval } from '@/lib/stripe/plans'

export const PLAN_PRICES: Record<string, { monthly: number; yearly: number }> = {
  basic: { monthly: 9, yearly: 7 },
  pro: { monthly: 29, yearly: 23 },
  enterprise: { monthly: 99, yearly: 79 },
}

export function findPlanKeyByPriceId(priceId: string | null): string | null {
  if (!priceId) return null
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.monthly.priceId === priceId || plan.yearly.priceId === priceId) return key
  }
  return null
}

export function getIntervalFromPriceId(priceId: string | null): PlanInterval | null {
  if (!priceId) return null
  for (const plan of Object.values(PLANS)) {
    if (plan.monthly.priceId === priceId) return 'month'
    if (plan.yearly.priceId === priceId) return 'year'
  }
  return null
}

export function getDisplayPrice(planKey: string, interval: PlanInterval): number | null {
  return PLAN_PRICES[planKey]?.[interval === 'year' ? 'yearly' : 'monthly'] ?? null
}

export function formatCurrency(amount: number, currency = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount)
}

export function formatBillingInterval(interval: PlanInterval | null): string {
  if (interval === 'year') return 'Billed yearly'
  if (interval === 'month') return 'Billed monthly'
  return '—'
}

export function statusBadgeVariant(
  status: string | null,
): 'success' | 'warning' | 'primary' | 'default' {
  if (!status) return 'default'
  if (status === 'active' || status === 'trialing') return 'success'
  if (status === 'past_due' || status === 'unpaid') return 'warning'
  if (status === 'open') return 'primary'
  return 'default'
}

export function invoiceStatusVariant(
  status: string,
): 'success' | 'warning' | 'primary' | 'default' {
  if (status === 'paid') return 'success'
  if (status === 'open') return 'primary'
  if (status === 'uncollectible' || status === 'void') return 'warning'
  return 'default'
}
