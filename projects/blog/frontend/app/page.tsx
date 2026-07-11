import Link from 'next/link'

export default async function Home(){
  const res = await fetch('http://api:3000/posts')
  const posts = await res.json()

  return (
    <main className="max-w-md p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <Link
        data-testid="new-post-link"
        href="/posts/new"
        className="text-blue-400 hover:text-blue-300 underline w-fit"
        >
        新規投稿
      </Link>
      <ul className="flex flex-col gap-2">
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id} className="border-b border-neutral-700 pb-2">
          <Link href={`/posts/${post.id}`}
            className="text-blue-400 hover:text-blue-300 underline"
            >
            {post.title}</Link></li>
        ))}
      </ul>
    </main>
  )
}

