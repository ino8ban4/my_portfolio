FROM node:alpine AS builder

WORKDIR /workspace

COPY package.json .
RUN npm install

COPY . .
RUN DATABASE_URL="postgresql://dummy:dummy@dummy:5432/dummy" npx prisma generate
RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /workspace

COPY package.json .
RUN npm install --omit=dev

COPY --from=builder /workspace/dist ./dist

CMD ["npm", "start"]

