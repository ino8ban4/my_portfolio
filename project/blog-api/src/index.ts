import Fastify from 'fastify'
import { postRoutes } from './routes/posts'

const app = Fastify({ logger: true})

app.register(postRoutes)

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0'})
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()

