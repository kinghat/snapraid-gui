import { Application, oakCors } from "../deps.ts";
import router from "./routes/router.ts";

const app = new Application();
const PORT = 8080;

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`server listening on port: ${url}`);
});

await app.listen({ port: PORT });
