import { createClient } from '../../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard | Next.js Supabase Boilerplate',
  description: 'Manage your account and posts',
}

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { posts: true, profile: true },
  })

  if (!dbUser) {
    // Handle the case where the user is not found in the database
    return <div>User not found</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {dbUser.name || 'Not set'}</p>
            <p><strong>Email:</strong> {dbUser.email}</p>
            <p><strong>Bio:</strong> {dbUser.profile?.bio || 'Not set'}</p>
            <Button asChild className="mt-4">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {dbUser.posts.length === 0 ? (
              <p>You haven't created any posts yet.</p>
            ) : (
              <ul className="list-disc list-inside">
                {dbUser.posts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            )}
            <Button asChild className="mt-4">
              <Link href="/posts/new">Create New Post</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
