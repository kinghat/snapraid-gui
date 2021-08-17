// Commands:
//   list   List the array content
//   dup    Find duplicate files
//   up     Spin-up the array
//   down   Spin-down the array
//   pool   Create or update the virtual view of the array
//   check  Check the array
//   fix    Fix the array
//   touch  Sets arbitrarily the sub-second time-stamp of all the files that have it at zero.

async function subProcess(command: string[]) {
  const process = Deno.run({
    cmd: command,
    stdout: "piped",
    stderr: "piped",
  });
  const [status, stdout, stderr] = await Promise.all([
    process.status(),
    process.output(),
    process.stderrOutput(),
  ]);

  process.close();

  console.log(`command: `, command);

  console.log(`status: `, status);
  console.log(`stderr: `, stderr);
  console.log(`stdout: `, stdout);
  if (status.code === 0) {
    const decodedOutput = new TextDecoder().decode(stdout);
    // console.log(decodedOutput);

    return decodedOutput;
  } else {
    const errorString = new TextDecoder().decode(stderr);

    return errorString;
  }
}

//status - Print the status of the array
export async function getStatus() {
  return await subProcess(["sudo", "snapraid", "status"]);
}
//smart - SMART attributes of the array
export async function getSmart() {
  return await subProcess(["sudo", "snapraid", "smart"]);
}
//diff - Show the changes that needs to be synchronized
export async function getDiff() {
  return await subProcess(["sudo", "snapraid", "diff"]);
}
//sync - Synchronize the state of the array
export async function startSync() {
  return await subProcess(["sudo", "snapraid", "sync"]);
}
//scrub - Scrub the array
export async function startScrub() {
  return await subProcess(["sudo", "snapraid", "scrub"]);
}
