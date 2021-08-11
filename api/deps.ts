// check for updates:
// deno run --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' --allow-read='.' --allow-write='deps.ts' https://deno.land/x/dmm@v1.3.2/mod.ts check
import {
  Application,
  Context,
  Router,
  RouterContext,
} from "https://deno.land/x/oak@v8.0.0/mod.ts";
// export { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
export { Application, Context, Router };
// export type { RouterContext } from "https://deno.land/x/oak/mod.ts";
export type { RouterContext };
export {
  copy,
  emptyDir,
  exists,
  move,
  walk,
} from "https://deno.land/std@0.104.0/fs/mod.ts";
export * as path from "https://deno.land/std@0.104.0/path/mod.ts";
export { parse } from "https://deno.land/std@0.104.0/flags/mod.ts";
// export {
//   Line,
//   Option,
//   Subcommand,
//   SubcommandOption,
// } from "https://deno.land/x/line@v0.1.1/mod.ts";
