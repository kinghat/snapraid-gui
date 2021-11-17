import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import {
  getDiff,
  getSmart,
  getStatus,
  startScrub,
  startSync,
  startTouch,
} from "../controllers/snapraidController.ts";

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
