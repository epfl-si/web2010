#!/usr/bin/env bash

#
# (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, VPSI, 2017.
# See the LICENSE file for more details.
#

WWW_PATH=/var/www/vhosts/www.epfl.ch
APP_NAME=web2010-vX.Y.Z-release.tgz
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SERVERS_LIST=( "exopgesrv34.epfl.ch"
               "exopgesrv75.epfl.ch"
               "exopgesrv76.epfl.ch"
               "exopgesrv95.epfl.ch"
               "exopgesrv96.epfl.ch" )

# Deploy the tools to the various servers
deploy_tools() {
  for SERVER in "${SERVERS_LIST[@]}"; do
    echo "Deploy to $SERVER..."
    scp $DIR/app.sh kis@$SERVER:~/
  done
}

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
  cp -r ~/tmp/css $WWW_PATH/htdocs
  cp -r ~/tmp/errors $WWW_PATH/htdocs
  cp -r ~/tmp/images $WWW_PATH/htdocs
  cp -r ~/tmp/img $WWW_PATH/htdocs
  cp -r ~/tmp/js $WWW_PATH/htdocs
  cp -r ~/tmp/templates $WWW_PATH/htdocs
  cp ~/tmp/*.shtml $WWW_PATH/htdocs/
  cp ~/tmp/favicon.ico $WWW_PATH/htdocs/
  cp ~/tmp/robots.txt $WWW_PATH/htdocs/

  # public is a folder where content is copied from homepage.epfl.ch (hp2013)
  if [ ! -d "$WWW_PATH/htdocs/public" ]; then
    mkdir $WWW_PATH/htdocs/public
  fi

  # if /homepages not exist, create an init. version (for the symlink below)
  if [ ! -d "$WWW_PATH/htdocs/homepages" ]; then
    mkdir -p $WWW_PATH/htdocs/homepages/initial/visual
    touch $WWW_PATH/htdocs/homepages/initial/index.en.html
    touch $WWW_PATH/htdocs/homepages/initial/index.fr.html
    ln -s $WWW_PATH/htdocs/homepages/initial $WWW_PATH/htdocs/homepages/current
    ln -s $WWW_PATH/htdocs/homepages/current/index.fr.html $WWW_PATH/htdocs/index.fr.html
    ln -s $WWW_PATH/htdocs/homepages/current/index.en.html $WWW_PATH/htdocs/index.en.html
    ln -s $WWW_PATH/htdocs/homepages/current/visual $WWW_PATH/htdocs/visual
  fi

  echo "Deployed version $VERSION"
}

case $1 in
  deploy) $1 $2;;
  deploy_tools) $1;;
  *)
    echo "Usage: $0 operation [options]"
    echo ""
    echo -e "\tdeploy <archive>:\tdeploys the specified app archive (<$APP_NAME>)"
    echo ""
    echo -e "\tdeploy_tools:\t\tdeploys the tools to the servers"
    exit 2
    ;;

esac
