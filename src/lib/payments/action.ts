'use server';

import { redirect } from 'next/navigation';
import { createCheckoutSession, createCustomerPortalSession } from './stripe';
import { getSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';

async function withTeam(
  action: (formData: FormData, team: any) => Promise<void>
) {
  return async (formData: FormData) => {
    const session = await getSession();
    
    if (!session?.user?.id) {
      redirect('/login?redirect=pricing');
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
      // Create a team for the user if they don't have one
      const newTeam = await prisma.team.create({
        data: {
          name: `${session.user.name || 'New'}'s Team`,
          slug: `${session.user.name || 'user'}-${Date.now()}`,
          members: {
            create: {
              userId: session.user.id,
              role: 'owner'
            }
          }
        }
      });
      
      const team = await prisma.team.findUnique({
        where: {
          id: newTeam.id
        }
      });
      
      return action(formData, team);
    }
    
    return action(formData, teamMember.team);
  };
}

export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({ team, priceId });
});

export const customerPortalAction = withTeam(async (_, team) => {
  const portalSession = await createCustomerPortalSession(team);
  redirect(portalSession.url);
});
