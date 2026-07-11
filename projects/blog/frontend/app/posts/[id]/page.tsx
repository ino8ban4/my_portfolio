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
    <main className="max-w-md p-6 flex flex-col gap-4">
      <h1 className="text-2x1 font-bold">{post.title}</h1>
      <p className="text-netutral-300">{post.content}</p>

      <form action={deletePostWithId}>
      <button 
        type="submit"
        data-testid="delete-button"
        className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 w-fit'">
      削除
      </button>
    </form>
  </main>
  )
}

