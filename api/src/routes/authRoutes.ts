import { Router, RouterContext } from "../../deps.ts";

const router = new Router({ prefix: "/api/auth" });

router.post("/register", async ({ response }: RouterContext) => {
  response.body = {};
});
router.post("/login", async ({ response }: RouterContext) => {
  response.body = {};
});
router.get("/logout", async ({ response }: RouterContext) => {
  response.body = {};
});

export default router;
