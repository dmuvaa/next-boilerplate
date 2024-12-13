import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import SEO from '@/components/seo'

export default function Home() {
  const features = [
    "Next.js 14 with App Router",
    "React 18 with latest features",
    "Supabase Authentication",
    "Prisma ORM for database management",
    "TypeScript for type safety",
    "Tailwind CSS for styling",
    "Dark/Light Mode with system preference",
    "SEO Optimization",
    "Responsive Design",
    "User Profiles",
    "Blog functionality",
    "Dashboard with authentication",
  ]

  return (
    <>
      <SEO 
        title="Next.js Supabase Boilerplate" 
        description="A comprehensive starter template with cutting-edge features for modern web development."
      />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Next.js Supabase Boilerplate</h1>
        <p className="text-xl mb-12 text-center text-muted-foreground">
          A comprehensive starter template with cutting-edge features for modern web development.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {feature}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mb-12">
          <Button asChild size="lg">
            <Link href="/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="https://github.com/yourusername/nextjs-supabase-boilerplate" target="_blank" rel="noopener noreferrer">View on GitHub</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>Follow these steps to get started with the boilerplate:</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Clone the repository</li>
              <li>Install dependencies with <code className="bg-muted px-1 py-0.5 rounded">npm install</code></li>
              <li>Set up your Supabase project and update environment variables</li>
              <li>Run migrations with <code className="bg-muted px-1 py-0.5 rounded">npx prisma migrate dev</code></li>
              <li>Start the development server with <code className="bg-muted px-1 py-0.5 rounded">npm run dev</code></li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

