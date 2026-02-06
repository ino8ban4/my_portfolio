# ==================
# Stage 1: Dependencies
# ==================
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# ==================
# Stage 2: Production
# ==================
FROM node:20-alpine AS runner
WORKDIR /app

# セキュリティ: 非rootユーザーで実行
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# 依存関係とアプリをコピー
COPY --from=deps --chown=expressjs:nodejs /app/node_modules ./node_modules
COPY --chown=expressjs:nodejs . .

USER expressjs

EXPOSE 3000

CMD ["node", "app.js"]
