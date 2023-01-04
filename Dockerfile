FROM docker-registry.default.svc:5000/wwp-test/node:16-alpine as build-stage

COPY . /app
WORKDIR /app

# Build
RUN \
  npm install && \
  npm run build


FROM docker-registry.default.svc:5000/wwp-test/nginx-unprivileged:1.22.1-alpine

ENV TZ=Europe/Zurich

RUN rm /etc/nginx/conf.d/default.conf

COPY web2010_nginx.conf /etc/nginx/conf.d/
COPY --from=build-stage /app/release/ /usr/share/nginx/html/
COPY docker-entrypoint.sh /

USER root
RUN \
  apk update && \
  apk add --no-cache openssl=3.0.7-r2 && \
  chmod a+x /docker-entrypoint.sh && \
  rm /usr/share/nginx/html/50x.html

USER 101
ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 8080 8443
