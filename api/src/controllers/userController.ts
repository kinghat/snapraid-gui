import { hash, Middleware, Status } from "../../deps.ts";
import { checkPassword } from "../helpers/authentication.ts";
import { User } from "../db/models/userModel.ts";
import { UserType } from "../types.ts";

export const signUp: Middleware = async ({ request, response }) => {
  try {
    // Check if single user has already been created
    const userQuery = await User.count();

    if (userQuery > 0) {
      response.status = Status.Conflict;
      response.body = { error: `user already exists.` };

      return;
    }

    const json: UserType = await request.body().value;

    json.username = json.username.trim();
    json.password = json.password.trim();

    const passwordHash = await hash(json.password);
    const newUser = await User.create({ ...json, password: passwordHash });

    console.log("newUser", newUser);

    response.status = Status.Created;
    response.body = { message: "created new user." };
  } catch (error) {
    console.error(error);

    response.status = Status.InternalServerError;
    response.body = error;
  }
};

export const signIn: Middleware = async (
  { request, response, state },
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
      response.body = { message: "unauthorized" };

      return;
    }

    await state.session.set(`userId`, user.id);

    console.log(`userId: ${await state.session.get(`userId`)}`);

    response.status = Status.OK;
    response.body = { message: `sign in successful.` };
  } catch (error) {
    console.error(error);

    response.body = error;
    response.status = Status.InternalServerError;
  }
};

export const signOut: Middleware = async (
  { response, state },
) => {
  const isAuthenticated = await state.session.get(`userId`);

  if (isAuthenticated) {
    await state.session.deleteSession();

    response.status = Status.OK;
    response.body = { message: `signed out.` };
  } else {
    await state.session.deleteSession();

    response.status = Status.BadRequest;
    response.body = { message: `not signed in.` };
  }
};
