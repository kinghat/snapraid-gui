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
ARG UBUNTU_TAG=20.04

FROM ubuntu:${UBUNTU_TAG}

ENV DENO_VERSION=1.11.2

RUN apt-get -qq update \
  && apt-get upgrade -y -o Dpkg::Options::="--force-confold" \
  && apt-get -qq install -y ca-certificates curl unzip sudo smartmontools git --no-install-recommends \
  && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip \
  --output deno.zip \
  && unzip deno.zip \
  && rm deno.zip \
  && chmod 755 deno \
  && mv deno /usr/bin/deno \
  && apt-get -qq remove -y ca-certificates curl unzip \
  && apt-get -y -qq autoremove \
  && apt-get -qq clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN useradd --uid 1000 -d /home/deno -ms /bin/bash --user-group deno \
  && mkdir /deno-dir/ \
  && chown deno:deno /deno-dir/

# useradd -u 1000 -d /home/developer -m -k /etc/skel -g 1000 developer

ENV DENO_DIR /deno-dir/
ENV DENO_INSTALL_ROOT /usr/local

COPY ./config/_entry.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 755 /usr/local/bin/docker-entrypoint.sh
COPY --from=build /build/snapraid /usr/local/bin/snapraid
COPY ./config/snapraid.conf /etc

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

WORKDIR /workspace


ENTRYPOINT ["docker-entrypoint.sh"]
USER deno
CMD ["run", "--unstable", "--watch", "--allow-net", "api/src/server.ts"]
