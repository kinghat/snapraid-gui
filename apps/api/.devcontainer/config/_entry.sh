#!/bin/sh

# freedomLoops() {
#   FILTER='^loop'
#   lsblk --raw -a --output "NAME,MAJ:MIN" --noheadings | grep -E "$FILTER" | while read LINE; do
#     DEV=/dev/$(echo "$LINE" | cut -d' ' -f1)
#     MAJMIN=$(echo "$LINE" | cut -d' ' -f2)
#     MAJ=$(echo "$MAJMIN" | cut -d: -f1)
#     MIN=$(echo "$MAJMIN" | cut -d: -f2)
#     [ -b "$DEV" ] || mknod "$DEV" b "$MAJ" "$MIN"
#   done
# }

# freedomLoops
sudo mount /mnt/loops/disk00.img /mnt/snapraid/disk00
# freedomLoops
sudo mount /mnt/loops/disk01.img /mnt/snapraid/disk01
# freedomLoops
sudo mount /mnt/loops/disk02.img /mnt/snapraid/disk02
# freedomLoops
sudo mount /mnt/loops/disk03.img /mnt/snapraid/disk03
# freedomLoops
sudo mount /mnt/loops/parity00.img /mnt/snapraid/parity00
# freedomLoops
sudo mount /mnt/loops/parity01.img /mnt/snapraid/parity01
sudo chown -R deno:deno /mnt/snapraid/disk*

set -e

case "$1" in
bundle | cache | compile | completions | coverage | doc | eval | fmt | help | info | install | lint | lsp | repl | run | test | types | upgrade)
  exec deno "$@"
  ;;
esac

exec "$@"
