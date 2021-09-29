import { Router } from "../../deps.ts";
import { loginUser, registerUser } from "../controllers/userController.ts";

const router = new Router({ prefix: "/api/auth" });

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/logout", logoutUser);

export default router;
