// how to run:
// deno run --unstable --allow-read --allow-write helpers/stubby/stubby.ts
// import { emptyDir, parse, path, walk } from "./deps.ts";
import { Line } from "./deps.ts";

import { CreateSubcommand } from "./subcommands/create.ts";
// import { DeleteSubcommand } from "./subcommands/delete.ts";
import { PrintSubcommand } from "./subcommands/print.ts";
// import { MoveSubcommand } from "./subcommands/move.ts";

// import Denomander from "https://deno.land/x/denomander@0.8.2/mod.ts";

const stubby = new Line({
  command: "stubby",
  name: "stubby",
  description:
    "for scaffolding and management of data files to aid in the development of snapraid-gui.",
  version: "v1.0.0",
  subcommands: [
    PrintSubcommand,
    CreateSubcommand,
    // DeleteSubcommand,
    // MoveSubcommand,
  ],
});

stubby.run();

// await createRandomFiles(10);
// await removeAllFiles();
// await removeSomeRandomFiles(13);
// await printDataFiles();

// const stubbyCLI = new Denomander({
//   app_name: "stubby",
//   app_description:
//     "for scaffolding and management of data files to aid in the development of snapraid-gui",
//   app_version: "1.0.0",
// });

// stubbyCLI.command("print", "print all the files", printDataFiles);
// stubbyCLI.command(
//   "create [numberOfFiles]",
//   "create random files on the data disks",
// ).action(({ numberOfFiles }: number) => createRandomFiles(numberOfFiles));

// stubbyCLI.parse(Deno.args);
