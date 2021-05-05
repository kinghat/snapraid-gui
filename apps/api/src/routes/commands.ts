import { Router, RouterContext } from "../../deps.ts";
import { commands } from "../data/commands.ts";

const router = new Router();

router.get("/api", ({ response }: RouterContext) => {
  response.body = `Hi! 👋 \n`;
});
router.get("/api/snapraid/diff", ({ response }: RouterContext) => {
  response.body = commands[1];
});
router.get("/api/snapraid/sync", ({ response }: RouterContext) => {
  response.body = commands[0];
});

export default router;
