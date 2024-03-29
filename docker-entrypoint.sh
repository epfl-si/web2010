#!/bin/sh

set -e

if ! [ -f /etc/nginx/ssl/server.key -a -f /etc/nginx/ssl/server.cert ]; then
    mkdir -p /etc/nginx/ssl || true
    /usr/bin/openssl req -x509 -sha256 -nodes -days 3650 -newkey rsa:4096 -keyout /etc/nginx/ssl/server.key -out /etc/nginx/ssl/server.cert -subj "/C=CH/ST=Vaud/L=Lausanne/O=Ecole Polytechnique Federale de Lausanne (EPFL)/CN=*.epfl.ch"
fi

exec nginx -g 'daemon off;';
