import { compare } from "../../deps.ts";
// import { create, getNumericDate, verify } from "../../deps.ts";

// const key = await crypto.subtle.generateKey(
//   { name: "HMAC", hash: "SHA-512" },
//   true,
//   ["sign", "verify"],
// );

export const checkPassword = async (password: string, hash: string) => {
  return await compare(
    password,
    hash,
  );
};
