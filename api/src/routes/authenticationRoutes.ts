import { Router } from "../../deps.ts";
import { authorize, session } from "../middlewares/authorizationMiddleware.ts";
import { signIn, signOut, signUp } from "../controllers/userController.ts";

const authRouter = new Router().prefix(`/api/auth`);

authRouter
  .post("/authorize", session.initMiddleware(), authorize)
  .post("/signup", signUp)
  .post("/signin", session.initMiddleware(), signIn)
  .post("/signout", session.initMiddleware(), signOut);

export default authRouter;
