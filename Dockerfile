FROM docker-registry.default.svc:5000/wwp-test/ubuntu:20.04 as build-stage

ENV TZ=Europe/Zurich

RUN \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
  echo $TZ > /etc/timezone

RUN \
  apt-get update && \
  apt-get install -yqq --no-install-recommends \
    ca-certificates=20210119~20.04.2 \
    git=1:2.25.1-1ubuntu3.2 \
    gnupg2=2.2.19-3ubuntu2.1 \
    wget=1.20.3-1ubuntu2 && \
  rm -rf /var/lib/apt/lists/*

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Install Node.js 16 via PPA
RUN \
  wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  echo "deb https://deb.nodesource.com/node_16.x focal main" > /etc/apt/sources.list.d/nodesource.list && \
  apt-get update && \
  apt-get install -yqq --no-install-recommends \
    nodejs=16.* && \
  rm -rf /var/lib/apt/lists/*

COPY . /app
WORKDIR /app

# Build setup
RUN npm install -g grunt@^1.4.1
RUN npm install

# Build
RUN grunt


FROM docker-registry.default.svc:5000/wwp-test/nginx-unprivileged:1.20.2-alpine

ENV TZ=Europe/Zurich

RUN rm /etc/nginx/conf.d/default.conf
COPY web2010_nginx.conf /etc/nginx/conf.d/

COPY --from=build-stage /app/release/ /usr/share/nginx/html/

COPY docker-entrypoint.sh /
USER root
RUN \
  apk update && \
  apk add --no-cache openssl=1.1.1n-r0
RUN chmod a+x /docker-entrypoint.sh
USER 101
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 8080 8443
