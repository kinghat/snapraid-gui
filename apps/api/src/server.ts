import { Application, Router, RouterContext } from "../deps.ts";
import commandsRouter from "./routes/commands.ts";
// import { posts } from "./data/posts.ts";

const app = new Application();
const router = new Router();
const PORT = 8080;

router.get("/api", ({ response }: RouterContext) => {
  response.body = `Hi! 👋 \n`;
});

app.use(router.routes());
app.use(commandsRouter.prefix("/api/snapraid").routes());
app.use(router.allowedMethods());

console.log(`server listening on port: ${PORT}`);
await app.listen({ port: PORT });
