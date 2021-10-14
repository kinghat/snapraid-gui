import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authMiddleware.ts";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.ts";

const router = new Router().prefix(`/api/authenticate`);

router
  .post("/register", registerUser)
  .post("/login", session.initMiddleware(), loginUser)
  .post("/logout", session.initMiddleware(), authorize, logoutUser);

export default router;
