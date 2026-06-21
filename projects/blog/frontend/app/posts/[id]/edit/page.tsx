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
    <form action={editPostWithId}>
    <input name="title" defaultValue={post.title}/>
    <textarea name="content" defaultValue={post.content}/>
    <input type="checkbox" name="published" value="true" defaultChecked={post.published} />
    <button type="submit">変更</button>
    </form>
  )
}

