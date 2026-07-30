import { redirect } from 'next/navigation'
import { FormField } from '../../components/FormField'
import { FormTextarea } from '../../components/FormTextarea'
import { SubmitButton } from '../../components/SubmitButton'

async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';

  await fetch('http://api:3000/posts' , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({title, content, published})
  })
  
  redirect('/')

}


export default function NewPostPage() {
  return (
    <form action={createPost} className='flex flex-col gap-4 max-w-md p-6'>
      <FormField id="title" name='title' label='タイトル' />
      <FormTextarea id="content" name='content' label='本文' />

      <div className='flex items-center gap-2'>
        <input type="checkbox" id="published" name="published" value="true" />
        <label htmlFor="published">公開する</label>
      </div>

      <SubmitButton testId="submit-button">投稿</SubmitButton>
    </form>
  )
}
