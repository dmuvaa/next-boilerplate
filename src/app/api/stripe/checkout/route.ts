import { NextResponse, type NextRequest } from "next/server"
import { createCheckoutSession } from "@/lib/payments/stripe"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/payments/stripe"

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json()
    const session = await createCheckoutSession(priceId)
    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.redirect(new URL("/pricing", request.url))
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["customer", "subscription"],
    })

    if (!session.customer || typeof session.customer === "string") {
      throw new Error("Invalid customer data from Stripe.")
    }

    const customerId = session.customer.id
    const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id

    if (!subscriptionId) {
      throw new Error("No subscription found for this session.")
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const userId = session.client_reference_id

    if (!userId) {
      throw new Error("No user ID found in session's client_reference_id.")
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: subscription.status,
        updatedAt: new Date(),
      },
    })

    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Error handling successful checkout:", error)
    return NextResponse.redirect(new URL("/error", request.url))
  }
}

