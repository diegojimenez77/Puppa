export type PlanInterval = 'month' | 'year'

export interface PlanPrice {
  priceId: string
  interval: PlanInterval
}

export interface Plan {
  name: string
  monthly: PlanPrice
  yearly: PlanPrice
}

export const PLANS: Record<string, Plan> = {
  basic: {
    name: 'Basic',
    monthly: { priceId: process.env.STRIPE_PRICE_BASIC_MONTHLY ?? '', interval: 'month' },
    yearly:  { priceId: process.env.STRIPE_PRICE_BASIC_YEARLY  ?? '', interval: 'year'  },
  },
  pro: {
    name: 'Pro',
    monthly: { priceId: process.env.STRIPE_PRICE_PRO_MONTHLY ?? '', interval: 'month' },
    yearly:  { priceId: process.env.STRIPE_PRICE_PRO_YEARLY  ?? '', interval: 'year'  },
  },
  enterprise: {
    name: 'Enterprise',
    monthly: { priceId: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY ?? '', interval: 'month' },
    yearly:  { priceId: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY  ?? '', interval: 'year'  },
  },
}
