// how to run or install:
// deno run --unstable --allow-read --allow-write helpers/stubby/stubby.ts
// deno install --unstable --allow-read --allow-write --name stubby helpers/stubby/stubby.ts

import { Line } from "./deps.ts";

import { CreateSubcommand } from "./subcommands/create.ts";
import { DeleteSubcommand } from "./subcommands/delete.ts";
import { PrintSubcommand } from "./subcommands/print.ts";
import { MoveSubcommand } from "./subcommands/move.ts";
import { CopySubcommand } from "./subcommands/copy.ts";

const stubby = new Line({
  command: "stubby",
  name: "stubby",
  description:
    "for scaffolding and management of data files to aid in the development of snapraid-gui.",
  version: "v1.0.0",
  subcommands: [
    PrintSubcommand,
    CreateSubcommand,
    DeleteSubcommand,
    MoveSubcommand,
    CopySubcommand,
  ],
});

stubby.run();
