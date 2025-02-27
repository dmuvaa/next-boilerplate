"use server"

import { redirect } from "next/navigation"
import { createCheckoutSession, createCustomerPortalSession } from "./stripe"
import { getUser } from "@/lib/auth/session"

export async function checkoutAction(formData: FormData) {
  const user = await getUser()
  if (!user) {
    redirect("/login")
  }

  const priceId = formData.get("priceId") as string
  await createCheckoutSession(priceId)
}

export async function customerPortalAction() {
  const user = await getUser()
  if (!user?.stripeCustomerId) {
    redirect("/pricing")
  }

  await createCustomerPortalSession(user.stripeCustomerId)
}

