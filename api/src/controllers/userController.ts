import { Context, hash, RouterContext, Status } from "../../deps.ts";
import { session } from "../middlewares/authMiddleware.ts";
import { checkPassword } from "./authController.ts";
import { User } from "../db/models/userModel.ts";
import { UserType } from "../types.ts";

export const registerUser = async ({ request, response }: RouterContext) => {
  try {
    // Check if single user has already been created
    const userQuery = await User.count();

    if (userQuery > 0) {
      response.status = Status.Conflict;
      response.body = { error: `A user has already been created.` };

      return;
    }

    const json: UserType = await request.body().value;

    json.username = json.username.trim();
    json.password = json.password.trim();

    const passwordHash = await hash(json.password);
    const newUser = await User.create({ ...json, password: passwordHash });
    console.log("newUser", newUser);

    response.status = Status.Created;
    // response.body = await generateToken(newUser);
  } catch (error) {
    console.error(error);
    response.status = Status.InternalServerError;
    response.body = error;
  }
};

export const loginUser = async ({ request, response }: RouterContext) => {
  const json: UserType = await request.body().value;

  try {
    // Find username on database
    const val: User = await User.where({
      username: json.username,
    }).first();

    // Check if user has that password
    const validPass: boolean = await checkPassword(
      json.password,
      val?.password?.toString() ?? "",
    );

    if (!val || !validPass) {
      throw { error: "Auth Error" };
    } else {
      console.log("valid user");
    }

    // return session and token
    // response.body = await generateToken(val);
  } catch (error) {
    console.error(error);
    response.body = error;
    response.status = 500;
  }
};

export async function logoutUser({ response, cookies }: RouterContext) {
  const sessionCookie = await cookies.get("session");

  if (sessionCookie) {
    session.deleteSession(sessionCookie);
    response.body = { success: `Logged out.` };
    response.status = Status.OK;
  } else {
    response.body = { error: `Not logged in.` };
    response.status = Status.BadRequest;
  }

  response.redirect(`/login`);
}
