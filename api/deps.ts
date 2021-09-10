// check for updates:
// deno run --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' --allow-read='.' --allow-write='deps.ts' https://deno.land/x/dmm@v1.3.2/mod.ts check
export { config } from "https://deno.land/x/dot_env@0.2.0/mod.ts";
import {
  Application,
  Context,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
// export { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
export { Application, Context, Router };
// export type { RouterContext } from "https://deno.land/x/oak/mod.ts";
export type { RouterContext };
export { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
export {
  copy,
  emptyDir,
  exists,
  move,
  walk,
} from "https://deno.land/std@0.106.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.106.0/path/mod.ts";
export { parse } from "https://deno.land/std@0.106.0/flags/mod.ts";
// export {
//   Line,
//   Option,
//   Subcommand,
//   SubcommandOption,
// } from "https://deno.land/x/line@v0.1.1/mod.ts";
