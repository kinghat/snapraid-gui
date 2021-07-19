import { path } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { AmountOption } from "../options/amount.ts";
import { SNAPRAID } from "../helpers.ts";

const { dataDisks } = SNAPRAID;
const prefix = "dummy-";
const extensions = [".mp3", ".mp4", ".mkv", ".txt"];

export class CreateSubcommand extends Subcommand {
  public signature = "create";

  public description = "Create random files, randomly across data disks.";

  public options = [AmountOption];

  // public async handle(): Promise<void> {
  //   const source = this.getArgumentValue("source"); // matches [source] in the signature
  //   const destination = this.getArgumentValue("destination"); // matches [destination] in the signature

  //   // Show the help if any of the arguments are missing
  //   if (!source || !destination) {
  //     this.showHelp();
  //     return;
  //   }

  //   try {
  //     await Deno.copyFile(source, destination);
  //     console.log(`Successfully copied '${source}' to '${destination}'.`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  public handle(): void {
    const amount = this.getOptionValue("--amount");
    if (amount) {
      createRandomFiles(Number(amount));
      return;
    }
    createRandomFiles();
    console.log(`created the default of 10 files.`);
  }
}

async function writeRandomDataFile() {
  const randomExtension = Math.floor(Math.random() * extensions.length);
  const randomDisk = Math.floor(Math.random() * dataDisks.length);
  const randomFilename = path.join(
    dataDisks[randomDisk].path,
    prefix +
      Math.floor(Math.random() * 2 ** 32 + 2 ** 12).toString(32) +
      extensions[randomExtension],
  );

  await Deno.writeFile(
    randomFilename,
    crypto.getRandomValues(new Uint8Array((Math.random() + 0.1) * 2 ** 14)),
  );

  console.log(randomFilename);
}

async function createRandomFiles(amount = 10) {
  await Promise.allSettled(
    Array(amount)
      .fill(0)
      .map((_) => writeRandomDataFile()),
  );

  // for (let number = 0; number < amount; number++) {
  //   await writeRandomFile();
  // }

  console.log(`created ${amount} files.`);
}
