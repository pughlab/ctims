#!/bin/bash

set -a
. /home/qa_env_vars.sh
set +a

docker compose --env-file /home/qa_env_vars.sh -f docker-compose-qa.yml up frontend_qa -d
