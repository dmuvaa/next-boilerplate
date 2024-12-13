import { Metadata } from 'next'
import Link from 'next/link'
import { SignUpForm } from '@/components/signup-form'

export const metadata: Metadata = {
  title: 'Sign Up | Next.js Supabase Boilerplate',
  description: 'Create a new account',
}

export default function SignUpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <SignUpForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

