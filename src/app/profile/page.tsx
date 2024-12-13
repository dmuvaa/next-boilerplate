import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProfileForm from '@/components/profile-form'

export const metadata = {
  title: 'Edit Profile | Next.js Supabase Boilerplate',
  description: 'Update your user profile',
}

export default async function ProfilePage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { profile: true },
  })

  if (!dbUser) {
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm user={dbUser} />
        </CardContent>
      </Card>
    </div>
  )
}

