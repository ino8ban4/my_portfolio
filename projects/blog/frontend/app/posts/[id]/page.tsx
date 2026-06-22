import { redirect } from 'next/navigation'

async function deletePost(id: string) {
  'use server'
  
  await fetch(`http://api:3000/posts/${id}`, {
    method: 'DELETE',
  })

  redirect('/')
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`http://api:3000/posts/${id}`);
  const post = await res.json();
  
  const deletePostWithId = deletePost.bind(null, id)

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <form action={deletePostWithId}>
      <button type="submit">削除</button>
      </form>

    </main>
  )
}

