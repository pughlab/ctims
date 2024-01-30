#!/bin/bash
set -a
. /home/qa_env_vars.sh
set +a

if [ "$(whoami)" = "jenkins" ]; then
    USER_HOME="/home"
else
    USER_HOME=$(getent passwd $SUDO_USER | cut -d: -f6)/.ssh
fi
export DOCKER_BUILDKIT=1
eval `ssh-agent`
ssh-add $USER_HOME/my_key
docker compose -f docker-compose-qa.yml build --no-cache --ssh default=$SSH_AUTH_SOCK mm_api_qa

