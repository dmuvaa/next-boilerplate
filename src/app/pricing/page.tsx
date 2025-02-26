import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { checkoutAction } from '@/lib/payments/actions';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export const metadata = {
  title: 'Pricing | Next.js Supabase Boilerplate',
  description: 'Choose a plan that works for you',
};

export default async function PricingPage() {
  const prices = await getStripePrices();
  const products = await getStripeProducts();

  // Combine products with their prices
  const plans = products.map(product => {
    const price = prices.find(p => p.productId === product.id);
    return {
      ...product,
      price: price ? {
        id: price.id,
        amount: price.unitAmount,
        currency: price.currency,
        interval: price.interval,
        trialDays: price.trialPeriodDays
      } : null
    };
  });

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h1>
      <p className="text-xl mb-12 text-center text-muted-foreground">
        Start with a 14-day free trial. No credit card required.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{plan.description}</p>
              {plan.price && (
                <div className="mt-4">
                  <p className="text-3xl font-bold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: plan.price.currency,
                      minimumFractionDigits: 0
                    }).format(plan.price.amount! / 100)}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{plan.price.interval}
                    </span>
                  </p>
                  {plan.price.trialDays && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.price.trialDays}-day free trial
                    </p>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <form action={checkoutAction}>
                <input type="hidden" name="priceId" value={plan.price?.id || ''} />
                <Button type="submit" className="w-full">
                  Get Started
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
