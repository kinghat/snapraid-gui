import { hash, RouterContext, Status } from "../../deps.ts";
import { session } from "../middlewares/authorizationMiddleware.ts";
import { checkPassword } from "../helpers/authentication.ts";
import { User } from "../db/models/userModel.ts";
import { UserType } from "../types.ts";

export const signUp = async ({ request, response }: RouterContext) => {
  try {
    // Check if single user has already been created
    const userQuery = await User.count();

    if (userQuery > 0) {
      response.status = Status.Conflict;
      response.body = { error: `User already exists.` };

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
  } catch (error) {
    console.error(error);

    response.status = Status.InternalServerError;
    response.body = error;
  }
};

export const signIn = async (
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

      return;
    }

    await state.session.set(`userId`, user.id);

    console.log(`userId: ${await state.session.get(`userId`)}`);

    response.status = Status.OK;
    response.body = { message: `Sign in successful.` };
  } catch (error) {
    console.error(error);

    response.body = error;
    response.status = Status.InternalServerError;
  }
};

export const signOut = async (
  { response, cookies, state }: RouterContext,
) => {
  // const sessionCookie = await cookies.get("session");
  const isAuthenticated = await state.session.get(`userId`);

  if (isAuthenticated) {
    // await session.deleteSession(sessionCookie);
    await state.session.deleteSession(await cookies.get(`session`));

    response.status = Status.OK;
    response.body = { message: `Signed out.` };
  } else {
    await state.session.deleteSession(await cookies.get(`session`));

    response.status = Status.BadRequest;
    response.body = { message: `Not signed in.` };
  }
};

// export const logout = async (
//   { response, state, cookies }: RouterContext,
// ) => {
//   // await session.deleteSession(sessionCookie);
//   await state.session.deleteSession(await cookies.get(`session`));

//   response.status = Status.OK;
//   response.body = { message: `Logged out.` };
// };
