const HASHNODE_API_URL = 'https://gql.hashnode.com'
const HASHNODE_BLOG_HOST = process.env.NEXT_PUBLIC_HASHNODE_BLOG_HOST

export async function getHashnodePosts() {
  const query = `
    query Publication {
    publication(host: "nextboilerplate.hashnode.dev") {
        isTeam
        title
        posts(first: 10) {
            edges {
                node {
                    title
                    brief
                    url
                }
            }
        }
    }
}
  `

  const variables = {
    hostname: HASHNODE_BLOG_HOST,
  }

  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const { data } = await response.json()
  return data.publication.posts.edges.map((edge: any) => edge.node)
}

export async function getHashnodePost(slug: string) {
  const query = `
    query GetPost($hostname: String!, $slug: String!) {
      publication(host: $hostname) {
        post(slug: $slug) {
          id
          title
          content
          dateAdded
          coverImage {
            url
          }
        }
      }
    }
  `

  const variables = {
    hostname: HASHNODE_BLOG_HOST,
    slug,
  }

  const response = await fetch(HASHNODE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  const { data } = await response.json()
  return data.publication.post
}
