import  { FastifyInstance } from "fastify";
import prisma from "../prisma";

export async function postRoutes(app: FastifyInstance) {
  
  // 全件取得
  app.get('/posts', async () => {
    return await prisma.post.findMany()
  })

  // 1件取得
  app.get<{ Params: {id: string } }>('/posts/:id', async(request) => {

    const { id } = request.params;

    return await prisma.post.findUnique({
      where: { id: Number(id) }
      })
  })

  // データ登録
  app.post<{ Body: { title: string, content: string} }>('/posts', async(request) => {
    const { title, content } = request.body;

    return await prisma.post.create({ data: {title, content } });
  });

  // データ更新
  app.put<{ Body: { title: string, content: string, published: boolean} , Params: { id: string } }>(
    '/posts/:id', async(request) => {
    const { title, content, published } = request.body;
    const { id } = request.params;

    return await prisma.post.update({
      where: { id: Number(id)},
      data: { title, content, published },
    })
  })
  
  // データ削除
  app.delete<{ Params: {id: string } }>('/posts/:id', async(request) => {
    const { id } = request.params;

    return await prisma.post.delete({
      where: { id: Number(id)}
    })
  })
}

