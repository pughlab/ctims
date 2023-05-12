#!/bin/bash
source ./vars.sh

FQIN="ctims-${GIT_BRANCH_SAFE}"

eval "helm upgrade --debug \
--set docker.registry.endpoint=$TECHNA_REGISTRY_ENDPOINT:$TECHNA_REGISTRY_PORT \
--set docker.image=$CTIMS_WEB_CONTAINER_IMAGE_LOCATION \
--set docker.dbImage=$CTIMS_DB_CONTAINER_IMAGE_LOCATION \
--set git.branch=$GIT_COMMIT_ISH \
--set git.ref=$GIT_REF \
--set git.is_clean=$GIT_IS_CLEAN \
--set domain=$TECHNA_HOSTNAME \
--set app=\"ctims\" \
--set domain=$TECHNA_HOSTNAME \
$FQIN $SELFDIR"