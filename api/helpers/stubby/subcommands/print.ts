import { walk } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { LongOption } from "../options/print-long.ts";
import { SNAPRAID } from "../helpers.ts";

const { mountPath } = SNAPRAID;

export class PrintSubcommand extends Subcommand {
  public signature = "print";

  public description = "Print a list of snapraid files to the console.";

  public options = [LongOption];

  public handle(): void {
    // must have a value passed to --long option to not null
    const long = this.getOptionValue("--long");

    printDataFiles(long).catch((error) => console.log(error));
  }
}

async function printDataFiles(output: string | null) {
  const files = [];
  let count = 0;

  for await (
    const entry of walk(mountPath, {
      includeDirs: false,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/(content)|(parity)/gi],
    })
  ) {
    count++;

    if (output) files.push(entry.name);
  }

  if (output) console.log(files);

  console.log(`${count} files.`);
}
