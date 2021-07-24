import { path } from "../../../deps.ts";
import { Subcommand } from "../deps.ts";

import { CreateAmountOption } from "../options/amount.ts";
import { SNAPRAID } from "../helpers.ts";

const { dataDisks } = SNAPRAID;
const prefix = "dummy-";
const extensions = [".mp3", ".mp4", ".mkv", ".txt"];

export class CreateSubcommand extends Subcommand {
  public signature = "create";

  public description = "Create random files, randomly across data disks.";

  public options = [CreateAmountOption];

  public async handle(): Promise<void> {
    const amount = this.getOptionValue("--amount");

    if (amount) {
      await createRandomDataFiles(Number(amount)).catch((error) =>
        console.log(error)
      );

      console.log(`created ${amount} files.`);

      return;
    }

    await createRandomDataFiles().catch((error) => console.log(error));

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
}

async function createRandomDataFiles(amount = 10) {
  await Promise.allSettled(
    Array(amount)
      .fill(0)
      .map((_) => writeRandomDataFile()),
  );
}
