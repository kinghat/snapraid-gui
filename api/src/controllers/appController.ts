import { RouterContext, Status } from "../../deps.ts";
import { session } from "../middlewares/authorizationMiddleware.ts";

export const home = ({ response }: RouterContext) => {
  response.status = Status.Accepted;
  response.body = { message: `Success.` };
  // response.redirect(`/dashboard`);
};

export const dashboard = ({ response }: RouterContext) => {
  response.status = Status.Accepted;
  response.body = { message: `Success.` };
};
