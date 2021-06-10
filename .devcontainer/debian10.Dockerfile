
FROM mcr.microsoft.com/vscode/devcontainers/base:debian-10

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno \
  && curl -fsSL https://deno.land/x/install/install.sh | sh \
  && chown -R vscode /deno

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
  DENO_DIR=${DENO_INSTALL}/.cache/deno

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get -y install --no-install-recommends <your-package-list-here>

RUN mkdir -p /loops \
  && dd if=/dev/zero of=/loops/disk00.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/disk01.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/disk02.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/disk03.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/loops/parity00.img bs=1 count=0 seek=250M \
  && dd if=/dev/zero of=/loops/parity01.img bs=1 count=0 seek=250M \
  && mkfs.ext4 -q /loops/disk00.img \
  && mkfs.ext4 -q /loops/disk01.img \
  && mkfs.ext4 -q /loops/disk02.img \
  && mkfs.ext4 -q /loops/disk03.img \
  && mkfs.ext4 -q /loops/parity00.img \
  && mkfs.ext4 -q /loops/parity01.img \
  && mkdir -p /mnt/snapraid/{disk00,disk01,disk02,disk03} \
  && mkdir -p /mnt/snapraid/{parity00,parity01} \
  && mount /loops/disk00.img /mnt/snapraid/disk00 \
  && mount /loops/disk01.img /mnt/snapraid/disk01 \
  && mount /loops/disk02.img /mnt/snapraid/disk02 \
  && mount /loops/disk03.img /mnt/snapraid/disk03 \
  && mount /loops/parity00.img /mnt/snapraid/parity00 \
  && mount /loops/parity01.img /mnt/snapraid/parity01

# COPY .devcontainer/config/snapraid.conf /etc

# The port that your application listens to.
# EXPOSE 8080 

# WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
# COPY deps.ts .
# RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
# ADD src ./src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
# RUN deno cache src/server.ts