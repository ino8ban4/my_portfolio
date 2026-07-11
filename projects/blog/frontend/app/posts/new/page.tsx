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
    <form action={createPost} className='flex flex-col gap-4 max-w-md p-6'>
    <div className='flex flex-col gap-1'>
      <label htmlFor="title" >タイトル</label>
      <input id="title"
             name="title"
             className='bg-netural-900 border border-neutral-600 next-neutral-100 rounded px-3 py-2'
      />
    </div>


    <div className='flex flex-col gap-1'>
    <label htmlFor="content" >本文</label>
    <textarea id="content" 
              name="content" 
              className='bg-netural-900 border border-neutral-600 next-neutral-100 rounded px-3 py-2 min-h-32'
    />
    </div>

    <button type="submit"
            data-testid="submit-button"
            className='bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 w-fit'
            >
            投稿
            </button>
    </form>
  )
}
