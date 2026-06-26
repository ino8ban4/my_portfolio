import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { postRoutes } from './routes/posts'

export async function buildApp(){
  const app = Fastify({ logger: true})
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Blog API',
        version: '1.0.0'
      }
    }
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs'
  })

  await app.register(postRoutes);

  app.get('/health', async() => {
    return { status: 'ok', timestamp: new Date().toISOString() }
  })

  return app

}

const start = async(): Promise<void> => {
  const app = await buildApp()
  try{
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch(err) {
    app.log.error(err)
    process.exit(1)
  }
}

if (require.main === module){
  start()
}

