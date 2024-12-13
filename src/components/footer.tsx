import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-background border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">About This Boilerplate</h3>
          <p className="text-sm text-muted-foreground">
            This Next.js Supabase Boilerplate provides a solid foundation for building modern web applications with server-side rendering, authentication, and database integration.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link href="/login" className="hover:underline">Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Next.js 14</li>
            <li>React 18</li>
            <li>Supabase</li>
            <li>Prisma ORM</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Next.js Supabase Boilerplate. All rights reserved.</p>
      </div>
    </footer>
  )
}

