import { Suspense } from "react"
import { getStripePrices, getStripeProducts } from "@/lib/payments/stripe"
import { checkoutAction } from "../../lib/payments/action"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Pricing | Next.js Supabase Boilerplate",
  description: "Choose a plan that works for you",
}

function PricingSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-1/2" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

async function PricingCards() {
  try {
    const [prices, products] = await Promise.all([getStripePrices(), getStripeProducts()])

    const plans = products.map((product) => {
      const price = prices.find((p) => p.productId === product.id)
      return {
        ...product,
        price: price
          ? {
              id: price.id,
              amount: price.unitAmount,
              currency: price.currency,
              interval: price.interval,
              trialDays: price.trialPeriodDays,
            }
          : null,
      }
    })

    return (
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{plan.description}</p>
              {plan.features && plan.features.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-4 w-4 text-green-500 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              {plan.price && (
                <div className="mt-4">
                  <p className="text-3xl font-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: plan.price.currency,
                      minimumFractionDigits: 0,
                    }).format(plan.price.amount! / 100)}
                    <span className="text-sm font-normal text-muted-foreground">/{plan.price.interval}</span>
                  </p>
                  {plan.price.trialDays && (
                    <p className="text-sm text-muted-foreground mt-1">{plan.price.trialDays}-day free trial</p>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <form action={checkoutAction} className="w-full">
                <input type="hidden" name="priceId" value={plan.price?.id || ""} />
                <Button type="submit" className="w-full">
                  Get Started
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Unable to load pricing plans</h2>
        <p className="text-muted-foreground">Please try again later or contact support.</p>
      </div>
    )
  }
}

export default async function PricingPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h1>
      <p className="text-xl mb-12 text-center text-muted-foreground">
        Start with a 14-day free trial. No credit card required.
      </p>

      <Suspense fallback={<PricingSkeleton />}>
        <PricingCards />
      </Suspense>
    </div>
  )
}

