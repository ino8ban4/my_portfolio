import  { FastifyInstance } from "fastify";
import prisma from "../prisma";

export async function postRoutes(app: FastifyInstance) {
  
  // 全件取得
  app.get('/posts', async () => {
    return await prisma.post.findMany()
  })


  // 1件取得
  app.get<{ Params: {id: string } }>('/posts/:id', async(request, reply) => {

    const { id } = request.params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) }
    })
    
    if (!post){
      return reply.code(404).send({ error: 'not found'})
    }

    return post
  })


  // データ登録
  app.post<{ Body: { title: string, content: string} }>('/posts', async(request, reply ) => {
    const { title, content } = request.body;

     if(!title || !content){
      return reply.code(400).send({ error: 'title and content are required'})
    }

    return await prisma.post.create({ data: {title, content } });
  });


  // データ更新
  app.put<{ Body: { title: string, content: string, published: boolean} , Params: { id: string } }>(
    '/posts/:id', async(request, reply ) => {
    const { title, content, published } = request.body;
    const { id } = request.params;

    if(!title || !content){
      return reply.code(400).send({ error: 'title and content are required'})
    }

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

