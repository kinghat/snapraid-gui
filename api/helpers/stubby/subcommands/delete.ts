import { Subcommand, walk } from "../../../deps.ts";

export class DeleteSubcommand extends Subcommand {
  public signature = "copy [source] [destination]";

  public description = "Copy a file from one location to another.";

  public options = [];

  public async handle(): Promise<void> {
    const source = this.getArgumentValue("source"); // matches [source] in the signature
    const destination = this.getArgumentValue("destination"); // matches [destination] in the signature

    // Show the help if any of the arguments are missing
    if (!source || !destination) {
      this.showHelp();
      return;
    }

    try {
      await Deno.copyFile(source, destination);
      console.log(`Successfully copied '${source}' to '${destination}'.`);
    } catch (error) {
      console.log(error);
    }
  }
}

async function removeAllFiles() {
  for await (
    const directory of walk(snapraidPath, {
      maxDepth: 1,
      includeDirs: true,
      includeFiles: false,
      match: [/disk/gi],
    })
  ) {
    await emptyDir(directory.path);
  }

  console.log(`removed all files!`);
}

async function removeSomeRandomFiles(amount: number) {
  let count = 0;
  const files = [];

  for await (
    const entry of walk(snapraidPath, {
      // maxDepth: 1,
      includeDirs: false,
      includeFiles: true,
      match: [/disk/gi],
      skip: [/.content/gi],
    })
  ) {
    files.push(entry.path);
  }

  const randomFiles = [
    ...files.sort(() => Math.random() - Math.random()).slice(0, amount),
  ];

  for (const file of randomFiles) {
    Deno.remove(file);
    console.log(file);
    count++;
  }

  console.log(`removed ${count} files!`);
}
