import { Application, Router } from "../deps.ts";
// import { posts } from "./data/posts.ts";

const app = new Application();
const router = new Router();
const PORT = 8080;

// async function getPosts(ctx: RouterContext) {
//   try {
//     const { response } = ctx;
//     // const posts = await Posts;
//     response.status = 201;
//     response.body = {
//       data: posts,
//     };
//   } catch (error) {
//     throw error;
//   }
// }

console.log(`server listening on port: ${PORT}`);
await app.listen({ port: PORT });
