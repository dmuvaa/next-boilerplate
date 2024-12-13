// 'use client'

// import { useState, useEffect } from 'react'
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import LoadingSpinner from '@/components/loading-spinner'
// import ErrorMessage from '@/components/error-message'

// interface HashnodePost {
//     title: string
//     brief: string
//     url: string
//     coverImage?: string  // Optional field for the cover image
// }

// export default function HashnodeBlog() {
//     const publicationHost = process.env.NEXT_PUBLIC_HASHNODE_BLOG_HOST || '';
//     const [posts, setPosts] = useState<HashnodePost[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [hasNextPage, setHasNextPage] = useState<boolean>(false);
//     const [endCursor, setEndCursor] = useState<string | null>(null);  // For pagination cursor

//     // Function to fetch posts with pagination
//     const fetchPosts = async (afterCursor: string | null = null) => {
//         setLoading(true);
//         try {
//             const response = await fetch('https://gql.hashnode.com/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     query: `
//                     query Publication($host: String!, $after: String) {
//                         publication(host: $host) {
//                             isTeam
//                             title
//                             posts(first: 10, after: $after) {
//                                 edges {
//                                     node {
//                                         title
//                                         brief
//                                         url
//                                         coverImage {
//                                             url
//                                         }
//                                     }
//                                 }
//                                 pageInfo {
//                                     endCursor
//                                     hasNextPage
//                                 }
//                             }
//                         }
//                     }
//                     `,
//                     variables: { host: publicationHost, after: afterCursor },
//                 }),
//             });

//             const data = await response.json();

//             if (data.errors) {
//                 throw new Error(data.errors[0].message);
//             }

//             const fetchedPosts = data.data.publication.posts.edges.map((edge: any) => edge.node);
//             setPosts((prevPosts) => [...prevPosts, ...fetchedPosts]);
//             setHasNextPage(data.data.publication.posts.pageInfo.hasNextPage);
//             setEndCursor(data.data.publication.posts.pageInfo.endCursor);
//         } catch (err: any) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchPosts(); // Initial fetch
//     }, [publicationHost]);

//     const loadMore = () => {
//         if (hasNextPage) {
//             fetchPosts(endCursor);
//         }
//     };

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return <ErrorMessage message={error} />;
//     }

//     return (
//         <div>
//             {/* Main Post Card */}
//             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                 {posts.map((post) => (
//                     <Card key={post.url} className="w-full max-w-sm mx-auto">
//                         {/* Card Image */}
//                         {post.coverImage && (
//                             <CardHeader className="p-0">
//                                 <img
//                                     src={post.coverImage.url}
//                                     alt={post.title}
//                                     className="w-full h-56 object-cover rounded-t-md"
//                                 />
//                             </CardHeader>
//                         )}

//                         <CardContent className="flex flex-col">
//                             <CardTitle className="text-xl font-semibold">
//                                 <Link href={post.url}>{post.title}</Link>
//                             </CardTitle>
//                             <CardDescription className="text-sm text-gray-500 mt-2">{post.brief}</CardDescription>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>

//             {/* Load More Button */}
//             {hasNextPage && (
//                 <Button onClick={loadMore} className="mt-8 w-full">
//                     Load More
//                 </Button>
//             )}
//         </div>
//     );
// }


'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LoadingSpinner from '@/components/loading-spinner'
import ErrorMessage from '@/components/error-message'

interface HashnodePost {
    title: string
    brief: string
    url: string
    coverImage?: {
        url: string
    }
}

export default function HashnodeBlog() {
    const publicationHost = process.env.NEXT_PUBLIC_HASHNODE_BLOG_HOST || '';
    const [posts, setPosts] = useState<HashnodePost[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false);
    const [endCursor, setEndCursor] = useState<string | null>(null);

    const fetchPosts = async (afterCursor: string | null = null) => {
        setLoading(true);
        try {
            const response = await fetch('https://gql.hashnode.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                    query Publication($host: String!, $after: String) {
                        publication(host: $host) {
                            isTeam
                            title
                            posts(first: 10, after: $after) {
                                edges {
                                    node {
                                        title
                                        brief
                                        url
                                        coverImage {
                                            url
                                        }
                                    }
                                }
                                pageInfo {
                                    endCursor
                                    hasNextPage
                                }
                            }
                        }
                    }
                    `,
                    variables: { host: publicationHost, after: afterCursor },
                }),
            });

            const data = await response.json();

            if (data.errors) {
                throw new Error(data.errors[0].message);
            }

            const fetchedPosts = data.data.publication.posts.edges.map((edge: any) => edge.node);
            setPosts((prevPosts) => {
                const newPosts = afterCursor ? [...prevPosts, ...fetchedPosts] : fetchedPosts;
                return Array.from(new Set(newPosts.map(post => post.url)))
                    .map(url => newPosts.find(post => post.url === url)!);
            });
            setHasNextPage(data.data.publication.posts.pageInfo.hasNextPage);
            setEndCursor(data.data.publication.posts.pageInfo.endCursor);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [publicationHost]);

    const loadMore = () => {
        if (hasNextPage) {
            fetchPosts(endCursor);
        }
    };

    if (loading && posts.length === 0) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <Card key={post.url} className="w-full max-w-sm mx-auto">
                        {post.coverImage && (
                            <CardHeader className="p-0">
                                <img
                                    src={post.coverImage.url}
                                    alt={post.title}
                                    className="w-full h-56 object-cover rounded-t-md"
                                />
                            </CardHeader>
                        )}
                        <CardContent className="flex flex-col">
                            <CardTitle className="text-xl font-semibold">
                                <Link href={post.url}>{post.title}</Link>
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-500 mt-2">{post.brief}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {hasNextPage && (
                <Button onClick={loadMore} className="mt-8 w-full">
                    {loading ? 'Loading...' : 'Load More'}
                </Button>
            )}
        </div>
    )
}

