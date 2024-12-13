import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  ogImage?: string
}

export default function SEO({ title, description, ogImage }: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

