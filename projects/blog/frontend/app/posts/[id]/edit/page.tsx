import { redirect } from 'next/navigation'

type Props = {
  params: Promise< {id: string} >
}

async function editPost(id: string, formData: FormData){
  'use server'
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';

  await fetch(`http://api:3000/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({title, content, published})
  })

  redirect(`/posts/${id}`)
}



export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`http://api:3000/posts/${id}`);
  const post = await res.json();

  const editPostWithId = editPost.bind(null, id);

  return (
    <form action={editPostWithId} className="flex flex-col gap-4 max-w-md p-6">
    <div className="flex flex-col gap-1">
      <label htmlFor="title">タイトル</label>
      <input
        id="title"
        name="title"
        defaultValue={post.title}
        className="bg-neutral-900 border border-neutral-600 text-neutral-100 rounded px-3 py-2"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label htmlFor="content">本文</label>
      <textarea
        id="content"
        name="content"
        defaultValue={post.content}
        className="bg-neutral-900 border border-neutral-600 text-neutral-100 rounded px-3 py-2 min-h-32"
      />
    </div>
      
    <div className="flex items-center gap-2">
      <input type="checkbox" name="published" value="true" defaultChecked={post.published} />
     l<label htmlFor="published">公開する</label>
    </div>

    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 w-fit"
      >
        編集
      </button>
    </form>
  )
}

