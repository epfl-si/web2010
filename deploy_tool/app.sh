#!/usr/bin/env bash

#
# (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
# See the LICENSE file for more details.
#

#WWW_PATH = /var/www/vhost/www.epfl.ch
WWW_PATH=~/tmp_man/www.epfl.ch
APP_NAME=web2010-vX.Y.Z-release.tgz

# Deploy a new version of the application
deploy() {

  if [ -z "$1" ]; then
    echo "Usage: $0 deploy <$APP_NAME>"
    exit 51
  fi

  if [ ! -f "$1" ]; then
    echo "Archive does not exist: $1"
    exit 69
  fi

  # Deploying new version
  rm -rf ~/tmp
  mkdir ~/tmp
  tar xzf $1 -C ~/tmp
  VERSION=`cat ~/tmp/package.json|grep version|cut -d'"' -f4`

  cp ~/tmp/config_apache/* $WWW_PATH/conf/
  cp -r ~/tmp/css $WWW_PATH/htdocs/css
  cp -r ~/tmp/errors $WWW_PATH/htdocs/errors
  cp -r ~/tmp/img $WWW_PATH/htdocs/img
  cp -r ~/tmp/js $WWW_PATH/htdocs/js
  cp -r ~/tmp/templates $WWW_PATH/htdocs/templates
  cp -r ~/tmp/tools $WWW_PATH/htdocs/tools
  cp ~/tmp/*.shtml $WWW_PATH/htdocs/
  cp ~/tmp/favicon.ico $WWW_PATH/htdocs/
  cp ~/tmp/robots.txt $WWW_PATH/htdocs/

  echo "Deployed version $VERSION"
}

case $1 in

  deploy) $1 $2;;
  *)
    echo "Usage: $0 operation [options]"
    echo ""
    echo -e "\tdeploy <archive>:\tdeploys the specified app archive (<$APP_NAME>)"
    exit 2
    ;;

esac
