import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.ts";

const authenticationRouter = new Router().prefix(`/api/authenticate`);

authenticationRouter
  .post("/register", registerUser)
  .post("/login", session.initMiddleware(), loginUser)
  .post("/logout", session.initMiddleware(), logoutUser);

export default authenticationRouter;
