import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: 'Login | Next.js Supabase Boilerplate',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

