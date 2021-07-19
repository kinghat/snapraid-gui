import { walk } from "../../deps.ts";

type Disk = "disk" | "parity";

interface DiskInfo {
  name: string;
  path: string;
}
const mountPath = "/mnt/snapraid";
const dataDisks: DiskInfo[] = await allocateDisks("disk");
const parityDisks: DiskInfo[] = await allocateDisks("parity");

async function allocateDisks(disk: Disk): Promise<DiskInfo[]> {
  const disks = [];

  for await (
    const { name, path } of walk(mountPath, {
      maxDepth: 1,
      includeDirs: true,
      includeFiles: false,
      match: [new RegExp(disk, "gi")],
    })
  ) {
    disks.push({ name, path });
  }

  return disks;
}

export const SNAPRAID = {
  mountPath,
  parityDisks,
  dataDisks,
};
