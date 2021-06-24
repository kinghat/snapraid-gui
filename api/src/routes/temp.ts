import { Router, RouterContext } from "../../deps.ts";

const router = new Router();

router.get("/api", ({ response }: RouterContext) => {
  response.body = `Hi!!! 👋 \n`;
});

export default router;
