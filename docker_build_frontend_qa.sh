#!/bin/bash
set -a
. /home/qa_env_vars.sh
set +a

docker compose build -f docker-compose-qa.yml --no-cache frontend_qa
