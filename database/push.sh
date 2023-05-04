#!/bin/bash
CTIMS_DB_CONTAINER_IMAGE_NAME=ctims-db
CTIMS_DB_CONTAINER_IMAGE_LOCATION=$TECHNA_REGISTRY_ENDPOINT:$TECHNA_REGISTRY_PORT/$CTIMS_DB_CONTAINER_IMAGE_NAME

GIT_REF="$(git rev-parse @)"
COMMIT_ISH="$(git describe --tags --all --always | grep --color=never -o -E '[^\/]+$' | sed "s/~/-/g")"

echo 'pushing database...'
docker push ${CTIMS_DB_CONTAINER_IMAGE_LOCATION}:latest
docker push ${CTIMS_DB_CONTAINER_IMAGE_LOCATION}:$GIT_REF
docker push ${CTIMS_DB_CONTAINER_IMAGE_LOCATION}:$COMMIT_ISH
