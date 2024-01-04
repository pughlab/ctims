#!/bin/bash
set -a
. /home/qa_env_vars.sh
set +a

export DOCKER_BUILDKIT=1
eval `ssh-agent`
ssh-add ~/.ssh/my_key
docker compose -f docker-compose-qa.yml build --no-cache --ssh default=$SSH_AUTH_SOCK mm_api_qa

