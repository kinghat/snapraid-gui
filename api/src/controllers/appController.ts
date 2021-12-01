import { Middleware, Status } from "../../deps.ts";
// import { session } from "../middlewares/authorizationMiddleware.ts";
import { User } from "../db/models/userModel.ts";
// import { UserType } from "../types.ts";

export const setup: Middleware = async ({ request, response }) => {
  try {
    // Check if single user has already been created
    const userCount = await User.count();

    if (userCount > 0) {
      response.status = Status.Conflict;
      response.body = { error: "already setup" };

      return;
    }

    // const json: UserType = await request.body().value;

    // json.username = json.username.trim();
    // json.password = json.password.trim();

    // const passwordHash = await hash(json.password);
    // const newUser = await User.create({ ...json, password: passwordHash });

    // console.log("newUser", newUser);

    response.status = Status.OK;
    response.body = { message: "redde for setup" };
  } catch (error) {
    console.error(error);

    response.status = Status.InternalServerError;
    response.body = error;
  }
};

export const home: Middleware = ({ response }) => {
  response.status = Status.OK;
  response.body = { message: `success` };
  // response.redirect(`/dashboard`);
};

export const dashboard: Middleware = ({ response }) => {
  response.status = Status.OK;
  response.body = { message: `success` };
};
