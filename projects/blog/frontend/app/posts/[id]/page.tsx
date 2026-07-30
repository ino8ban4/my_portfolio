import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SubmitButton } from '../../components/SubmitButton'

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
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-neutral-300">{post.content}</p>

      <div className="flex gap-2">
        <Link
          href={`/posts/${id}/edit`}
          className="bg-neutral-700 hover:bg-neutral-600 text-white rounded px-4 py-2 w-fit"
        >
        編集
      </Link>

      <form action={deletePostWithId}>
        <SubmitButton variant='danger' testId='delete-button'>削除</SubmitButton>
      </form>
      </div>
    </main>
  )
}

