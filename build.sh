#!/bin/bash

SELFDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "SELFDIR: $SELFDIR"
CTIMS_WEB_CONTAINER_IMAGE_NAME=ctims-web
CTIMS_WEB_CONTAINER_IMAGE_LOCATION=$TECHNA_REGISTRY_ENDPOINT:$TECHNA_REGISTRY_PORT/$CTIMS_WEB_CONTAINER_IMAGE_NAME

GIT_REF="$(git rev-parse @)"
GIT_BRANCH="$(git symbolic-ref --short HEAD)"
GIT_BRANCH_SAFE="$(echo "$GIT_BRANCH" | tr -dc '[:alnum:]' | tr '[:upper:]' '[:lower:]')"
GIT_IS_CLEAN="$(git diff-index --quiet HEAD && echo yes || echo no)"
COMMIT_ISH="$(git describe --tags --all --always | grep --color=never -o -E '[^\/]+$' | sed "s/~/-/g")"
PROJECT=ctims
CONTAINER_NAME=ctims-web

echo "CTIMS_WEB_CONTAINER_IMAGE_LOCATION: $CTIMS_WEB_CONTAINER_IMAGE_LOCATION"
echo "GIT_REF: $GIT_REF"
echo "GIT_BRANCH: $GIT_BRANCH"
echo "GIT_BRANCH_SAFE: $GIT_BRANCH_SAFE"
echo "GIT_IS_CLEAN: $GIT_IS_CLEAN"
echo "COMMIT_ISH: $COMMIT_ISH"

#docker-compose build --no-cache
docker build \
	--build-arg CTIMS_WEB_PORT=4201 \
	-t $CTIMS_WEB_CONTAINER_IMAGE_LOCATION:latest \
	-t $CTIMS_WEB_CONTAINER_IMAGE_LOCATION:$GIT_REF \
	-t $CTIMS_WEB_CONTAINER_IMAGE_LOCATION:$COMMIT_ISH \
	--label ca.uhn.techna.$PROJECT.appName="ctims" \
	--label ca.uhn.techna.$PROJECT.appVersion="0.1.1" \
	--label ca.uhn.techna.$PROJECT.containerName="$CONTAINER_NAME" \
	--label ca.uhn.techna.$PROJECT.containerRole="frontend" \
	--label ca.uhn.techna.$PROJECT.ref=$GIT_REF \
	--label ca.uhn.techna.$PROJECT.branch="$GIT_BRANCH" \
	"$DIR"
