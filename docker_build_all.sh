#!/bin/bash
# tells the shell to mark variables for export,
# which means they will be available to child processes.
set -a
#sources the environment file,
# effectively loading the environment variables into the current shell.
. /etc/environment
# unsets the export flag.
set +a
docker-compose build --no-cache
