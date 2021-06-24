ARG UBUNTU_TAG=20.04

#------------------------------------------------------------------------------------------
FROM ubuntu:${UBUNTU_TAG} as build

ARG SNAPRAID_VERSION=11.5

RUN DEBIAN_FRONTEND=noninteractive apt-get -y update \
  && DEBIAN_FRONTEND=noninteractive apt-get -y upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get -y install wget

ARG BUILD_DIR=/build

RUN mkdir ${BUILD_DIR}
WORKDIR ${BUILD_DIR}

RUN wget https://github.com/amadvance/snapraid/releases/download/v${SNAPRAID_VERSION}/snapraid-${SNAPRAID_VERSION}.tar.gz \
  && tar -xvf snapraid-${SNAPRAID_VERSION}.tar.gz \
  && ls -la

WORKDIR ${BUILD_DIR}/snapraid-${SNAPRAID_VERSION}

RUN DEBIAN_FRONTEND=noninteractive apt-get -y install gcc make

RUN ./configure
RUN make
RUN make check

RUN cp ./snapraid ${BUILD_DIR}/snapraid

################################################################

# ARG VARIANT=14
# ARG DENO_VERSION=1.11.1
# FROM hayd/ubuntu-deno:1.10.1
# FROM ubuntu:${UBUNTU_TAG}
# FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:16

# SHELL ["/bin/bash", "-c"]

# RUN apt-get -qq update \
#   && apt-get upgrade -y -o Dpkg::Options::="--force-confold" \
#   && apt-get -qq install -y smartmontools sudo git ca-certificates curl unzip --no-install-recommends \
#   && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
#   --output deno.zip \
#   && unzip deno.zip \
#   && rm deno.zip \
#   && chmod 755 deno \
#   && mv deno /usr/bin/deno \
#   && apt-get -qq remove -y ca-certificates curl unzip \
#   && apt-get -y -qq autoremove \
#   && apt-get -qq clean \
#   && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
  && apt-get -y install --no-install-recommends smartmontools

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
RUN su node -c "npm install -g pnpm"

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

COPY --from=build /build/snapraid /usr/local/bin/snapraid
# COPY .devcontainer/config/snapraid.conf /etc
COPY ./config/snapraid.conf /etc

ARG USERNAME=node
# ARG USERGROUP=${USERNAME}
# ARG USER_UID=1000
# ARG USER_GID=$USER_UID

# change user "node" to ${USERNAME} from ms image
# RUN groupadd ${USERGROUP} \
#   && usermod -l ${USERNAME} node \
#   && usermod -m -d /home/${USERNAME} \
#   && usermod -g ${USERGROUP} node

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno \
  && curl -fsSL https://deno.land/x/install/install.sh | sh \
  && chown -R ${USERNAME} /deno

ENV PATH=${DENO_INSTALL}/bin:${PATH} \
  DENO_DIR=${DENO_INSTALL}/.cache/deno


# RUN adduser $USERNAME --shell /bin/bash --quiet

# RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
#   && chmod 0440 /etc/sudoers.d/$USERNAME

# RUN mkdir /deno-dir/ \
#   && chown $USERNAME:$USERNAME /deno-dir/

# ENV DENO_DIR /deno-dir/
# ENV DENO_INSTALL_ROOT /usr/local

# COPY .devcontainer/config/_entry.sh /usr/local/bin/docker-entrypoint.sh
COPY ./config/_entry.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 755 /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]


# The port that your application listens to.
# EXPOSE 8080 3000

WORKDIR /workspace


RUN pnpm install

USER ${USERNAME}

# RUN pnpm -r dev
# RUN npm install -g pnpm \
#   && pnpm install
# Prefer not to run as root.
# USER node
# SHELL ["/bin/bash", "-c"]


# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally fetch deps.ts will download and compile _all_ external files used in main.ts.
# COPY deps.ts .
# RUN deno cache --unstable deps.ts

# These steps will be re-run upon each file change in your working directory:
# ADD src ./src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
# RUN deno cache --unstable src/server.ts

CMD ["run", "--unstable", "--watch", "--allow-net", "api/src/server.ts"]
# CMD ["pnpm", "-r", "dev"]