import { RouterContext, Status } from "../../deps.ts";

// TODO implement snapraid commands
// Commands:
//   list   List the array content
//   dup    Find duplicate files
//   up     Spin-up the array
//   down   Spin-down the array
//   pool   Create or update the virtual view of the array
//   check  Check the array
//   fix    Fix the array

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

  return {
    status,
    stdOut: new TextDecoder().decode(stdout),
    stdErr: new TextDecoder().decode(stderr),
  };
}

//status - Print the status of the array
export async function getStatus({ request, response }: RouterContext) {
  const { status: { code: exitCode }, stdOut, stdErr } = await subProcess([
    "sudo",
    "snapraid",
    "status",
  ]);

  console.log(
    `cmd: status\nexitCode: ${exitCode}\nstdOut:\n${stdOut}\nstdErr:\n${stdErr}`,
  );

  response.body = {
    route: "getStatus",
    cmd: `snapraid status`,
    exitCode,
    stdOut,
    stdErr,
  };
  response.status = Status.OK;

  if (exitCode === 0) {
    return { exitCode, stdOut, stdErr };
  } else {
    return { exitCode, stdOut, stdErr };
  }
}

//smart - SMART attributes of the array
export async function getSmart({ request, response }: RouterContext) {
  const { status: { code: exitCode }, stdOut, stdErr } = await subProcess([
    "sudo",
    "snapraid",
    "smart",
  ]);

  console.log(
    `cmd: smart\nexitCode: ${exitCode}\nstdOut:\n${stdOut}\nstdErr:\n${stdErr}`,
  );

  response.body = { route: "getStatus" };

  if (exitCode === 0) {
    return { exitCode, stdOut, stdErr };
  } else {
    return { exitCode, stdOut, stdErr };
  }
}

//diff - Show the changes that needs to be synchronized
export async function getDiff({ request, response }: RouterContext) {
  const { status: { code: exitCode }, stdOut, stdErr } = await subProcess([
    "sudo",
    "snapraid",
    "diff",
  ]);

  console.log(
    `cmd: diff\nexitCode: ${exitCode}\nstdOut:\n${stdOut}\nstdErr:\n${stdErr}`,
  );

  response.body = { route: "getStatus" };

  if (exitCode === 0) {
    return { exitCode, stdOut, stdErr };
  } else {
    return { exitCode, stdOut, stdErr };
  }
}

//sync - Synchronize the state of the array
export async function startSync({ request, response }: RouterContext) {
  const { status: { code: exitCode }, stdOut, stdErr } = await subProcess([
    "sudo",
    "snapraid",
    "sync",
  ]);

  console.log(
    `cmd: sync\nexitCode: ${exitCode}\nstdOut:\n${stdOut}\nstdErr:\n${stdErr}`,
  );

  response.body = { route: "getStatus" };

  if (exitCode === 0) {
    return { exitCode, stdOut, stdErr };
  } else {
    return { exitCode, stdOut, stdErr };
  }
}

//scrub - Scrub the array
export async function startScrub({ request, response }: RouterContext) {
  const { status: { code: exitCode }, stdOut, stdErr } = await subProcess([
    "sudo",
    "snapraid",
    "scrub",
  ]);

  console.log(
    `cmd: scrub\nexitCode: ${exitCode}\nstdOut:\n${stdOut}\nstdErr:\n${stdErr}`,
  );

  response.body = { route: "getStatus" };

  if (exitCode === 0) {
    return { exitCode, stdOut, stdErr };
  } else {
    return { exitCode, stdOut, stdErr };
  }
}

//touch - Sets arbitrarily the sub-second time-stamp of all the files that have it at zero.
export async function startTouch({ request, response }: RouterContext) {
  const { status: { code: exitCode }, stdOut, stdErr } = await subProcess([
    "sudo",
    "snapraid",
    "touch",
  ]);

  console.log(
    `cmd: touch\nexitCode: ${exitCode}\nstdOut:\n${stdOut}\nstdErr:\n${stdErr}`,
  );

  response.body = { route: "getStatus" };

  if (exitCode === 0) {
    return { exitCode, stdOut, stdErr };
  } else {
    return { exitCode, stdOut, stdErr };
  }
}
