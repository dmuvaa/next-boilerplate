import Image from 'next/image'
import { getHashnodePost } from '../../../lib/hashnode-client'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getHashnodePost(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.brief }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getHashnodePost(params.slug)

  if (!post) notFound()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-muted-foreground mb-4">
        Published on {new Date(post.dateAdded).toLocaleDateString()}
      </p>
      {post.coverImage && (
        <Image
          src={post.coverImage.url}
          alt={post.title}
          width={800}
          height={400}
          className="rounded-md object-cover mb-6"
        />
      )}
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}
