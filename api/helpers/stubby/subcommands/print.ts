import { walk } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";
import { SNAPRAID } from "../helpers.ts";

export class PrintSubcommand extends Subcommand {
  public signature = "print";

  public description = "Print a list of snapraid files to the console.";

  public options = [];

  public async handle(): Promise<void> {
    // const print = this.getArgumentValue("print");

    // if (!print) {
    //   this.showHelp();
    //   return;
    // }

    await printDataFiles().catch((error) => console.log(error));
    // try {
    //   await Deno.copyFile(source, destination);
    //   console.log(`Successfully copied '${source}' to '${destination}'.`);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}

async function printDataFiles() {
  const { dataDisks } = SNAPRAID;
  let count = 0;

  for (const disk of dataDisks) {
    for await (
      const entry of walk(disk.path, {
        includeDirs: false,
        includeFiles: true,
        match: [/disk/gi],
        skip: [/.content/gi],
      })
    ) {
      count++;
      console.log(entry);
    }
  }
  console.log(`${count} files.`);
}
