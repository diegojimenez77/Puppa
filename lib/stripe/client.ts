import Stripe from 'stripe'

let stripeClient: Stripe | undefined

/** Lazy init so `next build` does not require STRIPE_SECRET_KEY at module load. */
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    stripeClient = new Stripe(key)
  }
  return stripeClient
}
