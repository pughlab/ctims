#!/bin/bash

SELFDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "SELFDIR: $SELFDIR"
CTIMS_WEB_CONTAINER_IMAGE_NAME=ctims-web
CTIMS_WEB_CONTAINER_IMAGE_LOCATION=$TECHNA_REGISTRY_ENDPOINT:$TECHNA_REGISTRY_PORT/$CTIMS_WEB_CONTAINER_IMAGE_NAME

GIT_REF="$(git rev-parse @)"
GIT_BRANCH="$(git symbolic-ref --short HEAD)"
GIT_BRANCH_SAFE="$(echo "$GIT_BRANCH" | tr -dc '[:alnum:]' | tr '[:upper:]' '[:lower:]')"
GIT_IS_CLEAN="$(git diff-index --quiet HEAD && echo yes || echo no)"

echo "CTIMS_WEB_CONTAINER_IMAGE_LOCATION: $CTIMS_WEB_CONTAINER_IMAGE_LOCATION"
echo "GIT_REF: $GIT_REF"
echo "GIT_BRANCH: $GIT_BRANCH"
echo "GIT_BRANCH_SAFE: $GIT_BRANCH_SAFE"
echo "GIT_IS_CLEAN: $GIT_IS_CLEAN"

#docker-compose build --no-cache
