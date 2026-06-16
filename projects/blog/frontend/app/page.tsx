export default async function Home(){
  const res = await fetch('http://api:3000/posts')
  const posts = await res.json()

  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post: { id: number; title: string }) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  )
}

