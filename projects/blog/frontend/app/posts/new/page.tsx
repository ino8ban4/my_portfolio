import { redirect } from 'next/navigation'

async function createPost(formData: FormData) {
  'use server'
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await fetch('http://api:3000/posts' , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({title, content})
  })
  
  redirect('/')

}


export default function NewPostPage() {
  return (
    <form action={createPost}>
    <input name="title" />
    <textarea name="content" />
    <button type="submit">投稿</button>
    </form>
  )
}
