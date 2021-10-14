import { Router } from "../../deps.ts";
import { session } from "../middlewares/authMiddleware.ts";
import { authorize } from "../middlewares/authMiddleware.ts";
import {
  getDiff,
  getSmart,
  getStatus,
  startScrub,
  startSync,
  startTouch,
} from "../controllers/snapraidController.ts";

// const router = new Router();
const snapraidRouter = new Router().prefix("/api/snapraid").use(
  session.initMiddleware(),
  authorize,
);
snapraidRouter
  .get("/status", getStatus)
  .get("/smart", getSmart)
  .get("/diff", getDiff)
  .get("/scrub", startScrub)
  .get("/sync", startSync)
  .get("/touch", startTouch);

export default snapraidRouter;
