FROM docker-registry.default.svc:5000/wwp-test/node:22-alpine as build-stage

COPY . /app
WORKDIR /app

# Build
RUN \
  npm install && \
  npm run build


FROM docker-registry.default.svc:5000/wwp-test/nginx-unprivileged:1.26.2-alpine

ENV TZ=Europe/Zurich

RUN rm /etc/nginx/conf.d/default.conf

COPY web2010_nginx.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/release/ /usr/share/nginx/html/

USER root
RUN \
  apk update && \
  apk add --no-cache openssl && \
  chmod a+x /docker-entrypoint.sh && \
  rm /usr/share/nginx/html/50x.html

USER 101

EXPOSE 8080
