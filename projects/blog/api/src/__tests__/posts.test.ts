import { describe, it, expect, beforeAll, afterAll} from 'vitest'
import { buildApp } from '../index'

describe('GET/posts', () => {
  let app: Awaited<ReturnType<typeof buildApp>>

  beforeAll(async () => {
    app = await buildApp();
  })

  it('全件取得', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/posts'
    })
    expect(response.statusCode).toBe(200);
  })
})


describe('GET /posts/:id', () => {
  let app: Awaited<ReturnType<typeof buildApp>>
  let id : number

  beforeAll(async () => {
    app = await buildApp();
    id = await createTestPost(app);
  })

  it('1件取得', async () => {
    const response = await app.inject({
      method:'GET',
      url: `/posts/${id}`
    })
    expect(response.statusCode).toBe(200);
  })

  afterAll(async () => {
    deleteTestPost(app, id);
  })

})


describe('POST /posts', () => {
  let app: Awaited<ReturnType<typeof buildApp>>
  let createdId: number
  beforeAll(async () => {
    app = await buildApp();
  })
  
  it('投稿', async () =>{
    const response = await app.inject({
      method:'POST',
      url: '/posts',
      payload: { title: 'テスト', content: 'テスト本文'}
    })
    createdId = response.json().id;
    expect(response.statusCode).toBe(200);
  })
  
  afterAll(async () => {

    deleteTestPost(app, createdId)
  })
})


describe('PUT /posts/:id', () => {
  let app: Awaited<ReturnType<typeof buildApp>>
  let id: number;

  beforeAll(async () => {
    app = await buildApp();
    id = await createTestPost(app);
  })

  it('更新', async () => {
    const response = await app.inject({
      method: 'PUT',
      url: `/posts/${id}`,
      payload: { title: 'テストだった', content: 'テスト本文だった', published: false }
    })
    expect(response.statusCode).toBe(200);
  })

  afterAll(async () => {
    deleteTestPost(app, id);
  })
})


describe('DELETE /posts/:id', () => {
  let app: Awaited<ReturnType<typeof buildApp>>
  let id: number;

  beforeAll(async () => {
    app = await buildApp();
    id = await createTestPost(app)
  })

  it('削除', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/posts/${id}`,
    })
    expect(response.statusCode).toBe(200);
  })
})


async function createTestPost(app: Awaited<ReturnType<typeof buildApp>>){
  const res = await app.inject({
    method: 'POST',
    url: '/posts',
    payload: { title: 'テスト', content: 'テスト本文' }
  })
  return res.json().id
}

async function deleteTestPost(app: Awaited<ReturnType<typeof buildApp>>, id:number){
  await app.inject({
    method: 'DELETE',
    url: `/posts/${id}`
  })
}

