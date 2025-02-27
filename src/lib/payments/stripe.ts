import Stripe from "stripe"
import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth/session"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function createCheckoutSession(priceId: string) {
  const user = await getUser()

  if (!user) {
    redirect(`/sign-up?redirect=checkout&priceId=${priceId}`)
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    customer_email: user.email,
    client_reference_id: user.id,
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14,
    },
  })

  redirect(session.url!)
}

export async function createCustomerPortalSession(customerId: string) {
  if (!customerId) {
    redirect("/pricing")
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  })

  redirect(portalSession.url)
}

export async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const subscriptionId = subscription.id
  const status = subscription.status

  // Update user subscription status in database
  // Implementation will depend on your database setup
}

export async function getStripePrices() {
  const prices = await stripe.prices.list({
    expand: ["data.product"],
    active: true,
    type: "recurring",
  })

  return prices.data.map((price) => ({
    id: price.id,
    productId: typeof price.product === "string" ? price.product : price.product.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    trialPeriodDays: price.recurring?.trial_period_days,
  }))
}

export async function getStripeProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  })

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId:
      typeof product.default_price === "string" ? product.default_price : (product.default_price as Stripe.Price)?.id,
    features: product.features?.map((feature) => feature.name) || [],
    metadata: product.metadata,
  }))
}

