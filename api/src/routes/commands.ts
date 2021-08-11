import { Router, RouterContext } from "../../deps.ts";
import snapraidController from "../controllers/snapraid.ts";

const router = new Router();

router.get("/", ({ response }: RouterContext) => {
  response.body = snapraidController.getSmart;
});
router.get("/", ({ response }: RouterContext) => {
  response.body = snapraidController.getDiff;
});

export default router;
