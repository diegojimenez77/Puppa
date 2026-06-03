import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe/client'
import { PLANS } from '@/lib/stripe/plans'
import { createServiceClient } from '@/lib/supabase/service'

export const runtime = 'nodejs'

function getPlanName(priceId: string): string {
  for (const [, plan] of Object.entries(PLANS)) {
    if (plan.monthly.priceId === priceId || plan.yearly.priceId === priceId) {
      return plan.name
    }
  }
  return 'Unknown'
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const db = createServiceClient()

  const customer = await stripe.customers.retrieve(subscription.customer as string)
  if (customer.deleted) return

  const userId = (customer as Stripe.Customer).metadata?.supabase_user_id
  if (!userId) return

  const item = subscription.items.data[0]
  const priceId = item?.price.id ?? null

  await db.from('subscriptions').upsert({
    user_id: userId,
    stripe_customer_id: subscription.customer as string,
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    plan_name: priceId ? getPlanName(priceId) : null,
    status: subscription.status,
    current_period_start: item
      ? new Date(item.current_period_start * 1000).toISOString()
      : null,
    current_period_end: item
      ? new Date(item.current_period_end * 1000).toISOString()
      : null,
    cancel_at_period_end: subscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          await syncSubscription(subscription)
        }
        break
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await syncSubscription(subscription)
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const subId = invoice.parent?.subscription_details?.subscription
        if (subId) {
          const subscriptionId = typeof subId === 'string' ? subId : subId.id
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          await syncSubscription(subscription)
        }
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
