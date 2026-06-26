import { defineConfig  } from 'vitest/config'

export default defineConfig({
  test: {
    env: {
      DATABASE_URL: 'postgresql://blog:blog@db:5432/blog'
    }
  }
})

