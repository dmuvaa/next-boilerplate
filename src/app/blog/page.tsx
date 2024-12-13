import HashnodeBlog from '@/components/hashnode-blog'

export const metadata = {
  title: 'Blog | Next.js Supabase Boilerplate',
  description: 'Read our latest blog posts from Hashnode',
}

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Our Blog</h1>
      <HashnodeBlog />
    </div>
  )
}

