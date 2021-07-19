import { Subcommand } from "../../../deps.ts";

export class MoveSubcommand extends Subcommand {
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

function moveSomeFiles() {}
