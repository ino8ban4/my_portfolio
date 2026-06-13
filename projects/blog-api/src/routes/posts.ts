import  { FastifyInstance } from "fastify";
import prisma from "../prisma";

export async function postRoutes(app: FastifyInstance) {
  
  // GET:全件取得
  app.get('/posts', async () => {
    return await prisma.post.findMany()
  })


  // GET:1件取得
  app.get<{ Params: {id: string } }>('/posts/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string'}
        }
      }
    }
  }, async( request ) => {
       const { id } = request.params;

       const post = await prisma.post.findUnique({
         where: { id: Number(id) }
        })
        
        return post
      })



  // POST:データ登録
  app.post<{ Body: { title: string, content: string} }>('/posts', {
    schema: {
      body: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
        }
      }
    }
  }, async(request, reply ) => {
    const { title, content } = request.body;

    return await prisma.post.create({ data: {title, content } });
  });


  // PUT:データ更新
  app.put<{ Body: { title: string, content: string, published: boolean} , Params: { id: string } }>(
    '/posts/:id', {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'content', 'published'],
          properties: {
            title: { type: 'string'},
            content: { type: 'string'},
            published: { type: 'boolean'},
          }
        },
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string'}
        }
      }
    }
  }, async( request ) => {
    const { title, content, published } = request.body;
    const { id } = request.params;

    return await prisma.post.update({
      where: { id: Number(id)},
      data: { title, content, published },
    })
  })
  

  // DELETE:データ削除
  app.delete<{ Params: {id: string } }>('/posts/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string'}
        }
      }
    }
  }, async(request) => {
    const { id } = request.params;

    return await prisma.post.delete({
      where: { id: Number(id)}
    })
  })
}

