import { Router, RouterContext } from "../../deps.ts";
import { commands } from "../data/commands.ts";

const router = new Router();

router.get("/", ({ response }: RouterContext) => {
  response.body = commands[1];
});
router.get("/", ({ response }: RouterContext) => {
  response.body = commands[0];
});

export default router;
