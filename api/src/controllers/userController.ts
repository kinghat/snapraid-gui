import { hash, RouterContext } from "../../deps.ts";
import { checkPassword, generateToken } from "./authController.ts";
import { User } from "../db/models/userModel.ts";
import { UserType } from "../types.ts";

export const registerUser = async ({ request, response }: RouterContext) => {
  try {
    const json: UserType = await request.body().value;
    json.username = json.username.trim();
    json.password = json.password.trim();

    // Check if username is unique
    const user: User[] = await User.where({
      username: json.username,
    }).all();
    console.log(user);

    if (user.length >= 1) {
      throw { error: "Username Already taken" };
    }

    // Hash password
    const passwordHash = await hash(json.password);
    const val = await User.create({ ...json, password: passwordHash });

    // return session and token
    response.body = await generateToken(val);
  } catch (error) {
    console.log(error);
    response.body = error;

    response.status = 500;
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
    response.body = await generateToken(val);
  } catch (error) {
    console.error(error);
    response.body = error;
    response.status = 500;
  }
};
