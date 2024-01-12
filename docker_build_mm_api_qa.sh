#!/bin/bash
set -a
. /home/qa_env_vars.sh
set +a

docker compose -f docker-compose-qa.yml build --no-cache mm_api_qa
