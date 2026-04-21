import Fastify from 'fastify'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { postRoutes } from './routes/posts'

const app = Fastify({ logger: true})


const start = async () => {
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

  app.register(postRoutes)

  try {
    await app.listen({ port: 3000, host: '0.0.0.0'})
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()

