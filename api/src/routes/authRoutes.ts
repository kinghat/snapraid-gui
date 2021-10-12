import { Router } from "../../deps.ts";
import { session } from "../middlewares/authMiddleware.ts";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.ts";

const router = new Router({ prefix: "/api/auth" });

router
  .post("/register", session.initMiddleware(), registerUser)
  .post("/login", session.initMiddleware(), loginUser)
  .post("/logout", session.initMiddleware(), logoutUser);

export default router;
