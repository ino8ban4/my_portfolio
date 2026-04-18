FROM node:22-alpine AS runnner

WORKDIR /workspace

COPY package.json .
RUN npm install --omit=dev

COPY --from=builder /workspace/dist ./dist

CMD ["npm", "start"]

