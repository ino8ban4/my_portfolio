FROM node:alpine AS builder

WORKDIR /workspace

COPY package.json package-lock.json .
RUN npm ci

COPY . .
RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy" npx prisma generate
RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /workspace

COPY package.json package-lock.json .
RUN npm ci --omit=dev

COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/src/generated ./src/generated

CMD ["npm", "start"]
