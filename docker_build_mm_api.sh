#!/bin/bash
set -a
. /etc/environment
set +a

# Figure out the user's home directory if it's using jenkins or sudo
if [ "$(whoami)" = "jenkins" ]; then
    USER_HOME="/home"
else
    USER_HOME=$(getent passwd $SUDO_USER | cut -d: -f6)/.ssh
fi
# Add github ssh key so can pull private repo
export DOCKER_BUILDKIT=1
eval `ssh-agent`
ssh-add $USER_HOME/my_key
docker compose build --no-cache --ssh default=$SSH_AUTH_SOCK mm_api

