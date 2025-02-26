import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { customerPortalAction } from '@/lib/payments/actions';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export const metadata = {
  title: 'Billing | Next.js Supabase Boilerplate',
  description: 'Manage your subscription and billing details',
};

export default async function BillingPage() {
  const session = await getSession();
  
  if (!session?.user?.id) {
    redirect('/login?redirect=dashboard/billing');
  }
  
  const teamMember = await prisma.teamMember.findFirst({
    where: {
      userId: session.user.id
    },
    include: {
      team: true
    }
  });
  
  if (!teamMember) {
    redirect('/dashboard');
  }
  
  const { team } = teamMember;
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Billing Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
        </CardHeader>
        <CardContent>
          {team.planName ? (
            <div className="space-y-2">
              <p><strong>Current Plan:</strong> {team.planName}</p>
              <p><strong>Status:</strong> {team.subscriptionStatus}</p>
            </div>
          ) : (
            <p>You are currently on the free plan.</p>
          )}
        </CardContent>
        <CardFooter>
          {team.stripeCustomerId ? (
            <form action={customerPortalAction}>
              <Button type="submit">Manage Subscription</Button>
            </form>
          ) : (
            <Button asChild>
              <a href="/pricing">Upgrade Plan</a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
