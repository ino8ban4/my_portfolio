import fastify from "fastify";

const app = fastify();

//Q1
type PostParams = {
  id: string;
}

type PostResponse = {
  id: number;
  title: string;
  content: string;
}

//Q2
app.get<{Params: PostParams; Reply: PostResponse}>(
  "/posts/:id",
  async(request, reply) => {
    const { id } = request.params;
    return { id: Number(id), title: "Hello", content: "World" };
  }
);

//Q3
const start = async () => {
  await app.listen({ port: 3000, host: "0.0.0.0"});
  console.log("Server running of posrt 3000");
};
start();
