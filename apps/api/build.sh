#!/bin/bash
SELFDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

CTIMS_API_CONTAINER_IMAGE_NAME=ctims-spi
CTIMS_API_CONTAINER_IMAGE_LOCATION=$TECHNA_REGISTRY_ENDPOINT:$TECHNA_REGISTRY_PORT/CTIMS_API_CONTAINER_IMAGE_NAME

GIT_REF="$(git rev-parse @)"
GIT_BRANCH="$(git symbolic-ref --short HEAD)"
COMMIT_ISH="$(git describe --tags --all --always | grep --color=never -o -E '[^\/]+$' | sed "s/~/-/g")"
PROJECT=ctims
CONTAINER_NAME=ctims-api

docker build \
  -t ${CTIMS_API_CONTAINER_IMAGE_LOCATION}:latest \
  -t ${CTIMS_API_CONTAINER_IMAGE_LOCATION}:${GIT_REF} \
  -t ${CTIMS_API_CONTAINER_IMAGE_LOCATION}:${COMMIT_ISH} \
  --label ca.uhn.techna.${PROJECT}.ref=$GIT_REF \
  --label ca.uhn.techna.${PROJECT}.branch=$GIT_BRANCH \
  --label ca.uhn.techna.${PROJECT}.appName="ctims" \
  --label ca.uhn.techna.${PROJECT}.appVersion="0.1.0" \
  --label ca.uhn.techna.${PROJECT}.containerName=$CONTAINER_NAME \
  --label ca.uhn.techna.${PROJECT}.containerRole="backend" \
  $SELFDIR
