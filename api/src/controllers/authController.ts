import { User } from "../db/models/userModel.ts";
// import { UserType } from "../types.ts";
import type { RouterContext } from "../../deps.ts";
import { compare } from "../../deps.ts";
import { create, getNumericDate, verify } from "../../deps.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export const checkPassword = async (password: string, hash: string) => {
  return await compare(
    password,
    hash,
  );
};

/**
 * This will validate a JWT living inside the req.body.jwt
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return 403 status if jwt is invalid
 */
export const validateJWT = async (
  { request, response }: RouterContext,
  next: VoidFunction,
) => {
  const body = await request.body().value;
  const jwt = body?.jwt;

  try {
    if (!jwt) {
      throw { error: "Missing JWT Token 😨" };
    }

    await verify(jwt, key)
      .then(async () => {
        console.log("Valid JWT Token! 😎");
        await next(); // The next() will continue with the excecution
      })
      .catch((e) => {
        console.log(e);
        response.body = { error: e.toString() };
        response.status = 401;
      });
  } catch (error) {
    console.error(error);
    response.body = error;
    response.status = 500;
  }
};

export const generateToken = async (user: User) => {
  console.log(key);

  const jwt = await create(
    { alg: "HS512", typ: "JWT" },
    {
      username: user.username,
      exp: getNumericDate(3600),
    },
    key,
  );

  return (jwt);
};
