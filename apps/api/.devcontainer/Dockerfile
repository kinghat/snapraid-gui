# FROM hayd/ubuntu-deno:1.10.1
FROM ubuntu:20.04

ENV DENO_VERSION=1.10.3

SHELL ["/bin/bash", "-c"]

RUN apt-get -qq update \
  && apt-get upgrade -y -o Dpkg::Options::="--force-confold" \
  && apt-get -qq install -y ca-certificates curl unzip --no-install-recommends \
  && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
  --output deno.zip \
  && unzip deno.zip \
  && rm deno.zip \
  && chmod 755 deno \
  && mv deno /usr/bin/deno \
  && apt-get -qq remove -y ca-certificates curl unzip \
  && apt-get install -y sudo \
  && apt-get -y -qq autoremove \
  && apt-get -qq clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG USERNAME=deno
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN adduser $USERNAME --shell /bin/bash --quiet

RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
  && chmod 0440 /etc/sudoers.d/$USERNAME

RUN mkdir /deno-dir/ \
  && chown deno:deno /deno-dir/

ENV DENO_DIR /deno-dir/
ENV DENO_INSTALL_ROOT /usr/local

COPY .devcontainer/config/_entry.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 755 /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

RUN mkdir -p /mnt/loops \
  && mkdir -p /mnt/snapraid/disk{00..03} \
  && mkdir -p /mnt/snapraid/parity{00..01} \
  && dd if=/dev/zero of=/mnt/loops/disk00.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/disk01.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/disk02.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/disk03.img bs=1 count=0 seek=200M \
  && dd if=/dev/zero of=/mnt/loops/parity00.img bs=1 count=0 seek=250M \
  && dd if=/dev/zero of=/mnt/loops/parity01.img bs=1 count=0 seek=250M \
  && mkfs.ext4 -q /mnt/loops/disk00.img \
  && mkfs.ext4 -q /mnt/loops/disk01.img \
  && mkfs.ext4 -q /mnt/loops/disk02.img \
  && mkfs.ext4 -q /mnt/loops/disk03.img \
  && mkfs.ext4 -q /mnt/loops/parity00.img \
  && mkfs.ext4 -q /mnt/loops/parity01.img

COPY .devcontainer/config/snapraid.conf /etc

# The port that your application listens to.
EXPOSE 8080 

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache --unstable deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD src ./src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --unstable src/server.ts

CMD ["run", "--allow-net", "--unstable", "src/server.ts"]