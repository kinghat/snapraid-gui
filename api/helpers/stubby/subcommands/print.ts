import { walk } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { LongOption } from "../options/print-long.ts";
import { SNAPRAID } from "../helpers.ts";

export class PrintSubcommand extends Subcommand {
  public signature = "print";

  public description = "Print a list of snapraid files to the console.";

  public options = [LongOption];

  public handle(): void {
    const long = this.getOptionValue("--long");

    printDataFiles(long).catch((error) => console.log(error));
  }
}

async function printDataFiles(output: string | null) {
  const { dataDisks } = SNAPRAID;
  const files = [];
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
      if (output) files.push(entry.name);
    }
  }
  if (output) console.log(files);
  console.log(`${count} files.`);
}
