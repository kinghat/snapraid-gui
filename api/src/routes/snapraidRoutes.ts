import { Router } from "../../deps.ts";
import { session } from "../middlewares/authMiddleware.ts";
// import { validateJWT } from "../controllers/authController.ts";
import {
  getDiff,
  getSmart,
  getStatus,
  startScrub,
  startSync,
  startTouch,
} from "../controllers/snapraidController.ts";

// const router = new Router();
const router = new Router({ prefix: "/api/snapraid" });
router
  .get("/status", session.initMiddleware(), getStatus)
  .get("/smart", session.initMiddleware(), getSmart)
  .get("/diff", session.initMiddleware(), getDiff)
  .get("/scrub", session.initMiddleware(), startScrub)
  .get("/sync", session.initMiddleware(), startSync)
  .get("/touch", session.initMiddleware(), startTouch);

export default router;
