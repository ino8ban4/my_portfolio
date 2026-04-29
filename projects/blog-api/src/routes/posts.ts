import { FastifyInstance } from 'fastify'
import prisma from '../prisma'

export async function postRoutes(app: FastifyInstance) {
  // 一覧取得
  app.get('/posts', async () => {
    return await prisma.post.findMany()
  })

  // 1件取得
  app.get('/posts/:id', async (request) => {
    const { id } = request.params as { id: string}
    return await prisma.post.findUnique({
      where: {id: Number(id) }
    })
  })

  // 作成
  app.post('/posts', async (request) => {
    const { title, content } = request.body as { title: string, content: string}
    return await prisma.post.create({
      data: {title, content }
    })
  })

  // 更新
  app.put('/posts/:id', async (request) => {
    const { id } = request.params as { id: string}
    const { title, content, published } = request.body as { title: string, content: string, published: boolean}
    return await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, published }
    })
  })
  // 削除
  app.delete('/posts/:id', async (request) => {
    const { id } = request.params as { id: string }
    return await prisma.post.delete({
      where: { id: Number(id)}
    })
  })
}

