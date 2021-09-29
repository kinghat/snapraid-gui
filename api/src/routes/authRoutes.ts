import { Router, RouterContext } from "../../deps.ts";
import { registerUser } from "../controllers/userController.ts";

const router = new Router({ prefix: "/api/auth" });

router.post("/register", registerUser);
// router.post("/login", async ({ response }: RouterContext) => {
//   response.body = {};
// });
// router.get("/logout", async ({ response }: RouterContext) => {
//   response.body = {};
// });

export default router;
