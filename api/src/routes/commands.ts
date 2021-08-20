import { Router, RouterContext } from "../../deps.ts";
import {
  getDiff,
  getSmart,
  getStatus,
  startScrub,
  startSync,
  startTouch,
} from "../controllers/snapraid.ts";

const router = new Router();
router.get("/status", async ({ response }: RouterContext) => {
  response.body = { route: "status", ...await getStatus() };
});
router.get("/smart", async ({ response }: RouterContext) => {
  response.body = { route: "smart", ...await getSmart() };
});
router.get("/diff", async ({ response }: RouterContext) => {
  response.body = { route: "diff", ...await getDiff() };
});
router.patch("/scrub", async ({ response }: RouterContext) => {
  response.body = { route: "scrub", ...await startScrub() };
});
router.put("/sync", async ({ response }: RouterContext) => {
  response.body = { route: "sync", ...await startSync() };
});
router.patch("/touch", async ({ response }: RouterContext) => {
  response.body = { route: "touch", ...await startTouch() };
});

export default router;
