import { hash, RouterContext, Status } from "../../deps.ts";
import { session } from "../middlewares/authorizationMiddleware.ts";
import { checkPassword } from "../helpers/authentication.ts";
import { User } from "../db/models/userModel.ts";
import { UserType } from "../types.ts";

export const registerUser = async ({ request, response }: RouterContext) => {
  try {
    // Check if single user has already been created
    const userQuery = await User.count();

    if (userQuery > 0) {
      response.status = Status.Conflict;
      response.body = { error: `This user has already been created.` };

      return;
    }

    const json: UserType = await request.body().value;

    json.username = json.username.trim();
    json.password = json.password.trim();

    const passwordHash = await hash(json.password);
    const newUser = await User.create({ ...json, password: passwordHash });
    console.log("newUser", newUser);

    response.status = Status.Created;
    response.body = { message: "Created new user." };
    // response.redirect(`/login`);
  } catch (error) {
    console.error(error);
    response.status = Status.InternalServerError;
    response.body = error;
  }
};

export const loginUser = async (
  { request, response, state }: RouterContext,
) => {
  const json: UserType = await request.body().value;

  try {
    // Find username on database
    const user: User = await User.where({
      username: json.username,
    }).first();

    // Check if user has that password
    const validPass: boolean = await checkPassword(
      json.password,
      user?.password?.toString() ?? "",
    );

    if (!user || !validPass) {
      response.status = Status.Unauthorized;
      response.body = { message: "Unauthorized" };
      // response.redirect(`/login`);

      return;
    }

    state.session.set(`userId`, user.id);
    response.status = Status.OK;
    response.body = { message: `Login successful.` };
    // response.redirect(`/dashboard`);
  } catch (error) {
    console.error(error);
    response.body = error;
    response.status = Status.InternalServerError;
  }
};

export const logoutUser = async ({ response, cookies }: RouterContext) => {
  const sessionCookie = await cookies.get("session");

  if (sessionCookie) {
    await session.deleteSession(sessionCookie);

    response.status = Status.OK;
    response.body = { message: `Logged out.` };
  } else {
    response.status = Status.BadRequest;
    response.body = { message: `Not logged in.` };
  }

  // response.redirect(`/login`);
};
