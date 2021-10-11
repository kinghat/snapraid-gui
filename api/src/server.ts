import { Application, oakCors, Session, SqliteStore } from "../deps.ts";
import router from "./routes/router.ts";
import { db } from "./db/db.ts";

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

await db.sync();

await app.listen({ port: PORT });
