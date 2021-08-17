import { Router, RouterContext } from "../../deps.ts";
import {
  getDiff,
  getSmart,
  getStatus,
  startScrub,
  startSync,
} from "../controllers/snapraid.ts";

const router = new Router();
router.get("/status", async ({ response }: RouterContext) => {
  response.body = await getStatus();
});
router.get("/smart", async ({ response }: RouterContext) => {
  response.body = await getSmart();
});
router.get("/diff", async ({ response }: RouterContext) => {
  response.body = await getDiff();
});
router.get("/scrub", async ({ response }: RouterContext) => {
  response.body = await startScrub();
});
router.get("/sync", async ({ response }: RouterContext) => {
  response.body = await startSync();
});

export default router;
