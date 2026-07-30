import { redirect } from 'next/navigation'
import { FormField } from '../../../components/FormField'
import { FormTextarea } from '../../../components/FormTextarea'
import { SubmitButton } from '../../../components/SubmitButton'

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
      <FormField id="title" name='title' label='タイトル' defaultValue={post.title}/>
      <FormTextarea id="content" name='content' label='本文' defaultValue={post.content}/>

     
      <div className="flex items-center gap-2">
        <input type="checkbox" name="published" value="true" defaultChecked={post.published} />
        <label htmlFor="published">公開する</label>
      </div>

      <SubmitButton>編集</SubmitButton>
    </form>
  )
}

