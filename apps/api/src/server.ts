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

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`server listening on port: ${url}`);
});

await app.listen({ port: PORT });
