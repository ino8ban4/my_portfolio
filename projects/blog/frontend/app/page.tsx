import Link from 'next/link'

export default async function Home(){
  const res = await fetch('http://api:3000/posts')
  const posts = await res.json()

  return (
    <main>
      <h1>Blog Posts</h1>
      <Link data-testid="new-post-link" href="/posts/new">新規投稿</Link>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>
          <Link href={`/posts/${post.id}`}>{post.title}</Link></li>
        ))}
      </ul>
    </main>
  )
}

