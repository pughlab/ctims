#!/bin/bash
source ./vars.sh

FQIN="ctims-${GIT_BRANCH_SAFE}"

eval "helm install --debug \
--set docker.registry.endpoint=$TECHNA_REGISTRY_ENDPOINT:$TECHNA_REGISTRY_PORT \
--set git.branch=$GIT_COMMIT_ISH \
--set git.ref=$GIT_REF \
--set git.is_clean=$GIT_IS_CLEAN \
--set domain=$TECHNA_HOSTNAME \
--set app=\"ctims\" \
--set domain=$TECHNA_HOSTNAME \
$FQIN $SELFDIR"
