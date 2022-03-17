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
RUN npm install -g bower@^1.8.13 grunt@^1.4.1
RUN npm install
RUN bower install --allow-root

# Build
RUN grunt


FROM docker-registry.default.svc:5000/wwp-test/nginx:1.21.6

RUN \
  apt-get update && \
  apt-get install -yqq --no-install-recommends \
    vim=2:8.2.2434-3+deb11u1 && \
  rm -rf /var/lib/apt/lists/*

ENV TZ=Europe/Zurich

RUN rm /etc/nginx/conf.d/default.conf
COPY web2010_nginx.conf /etc/nginx/conf.d/

COPY --from=build-stage /app/release/ /usr/share/nginx/html/
