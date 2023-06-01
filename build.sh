#!/bin/bash

source ./vars.sh
echo "CTIMS_WEB_CONTAINER_IMAGE_LOCATION: $CTIMS_WEB_CONTAINER_IMAGE_LOCATION"
echo "GIT_REF: $GIT_REF"
echo "GIT_BRANCH: $GIT_BRANCH"
echo "GIT_BRANCH_SAFE: $GIT_BRANCH_SAFE"
echo "GIT_IS_CLEAN: $GIT_IS_CLEAN"
echo "COMMIT_ISH: $COMMIT_ISH"

#docker-compose build --no-cache
docker build --no-cache  \
	--build-arg CTIMS_WEB_PORT=3000 \
    --build-arg NEXTAUTH_SECRET=dAbxJF2DRzqwGYn+BWKdj8o9ieMri4FWsmIRn77r2F8= \
    --build-arg REACT_APP_API_URL=https://ctims-web.qa02.technainstitute.net/trials/api \
    --build-arg NEXTAUTH_URL=http://localhost:3000 \
    --build-arg NEXTAUTH_API_URL=http://localhost:3333/api \
	-t $CTIMS_WEB_CONTAINER_IMAGE_LOCATION:latest \
	-t $CTIMS_WEB_CONTAINER_IMAGE_LOCATION:$GIT_REF \
	-t $CTIMS_WEB_CONTAINER_IMAGE_LOCATION:$COMMIT_ISH \
	--label ca.uhn.techna.$PROJECT.appName="ctims" \
	--label ca.uhn.techna.$PROJECT.appVersion="0.1.0" \
	--label ca.uhn.techna.$PROJECT.containerName="$CONTAINER_NAME" \
	--label ca.uhn.techna.$PROJECT.containerRole="frontend" \
	--label ca.uhn.techna.$PROJECT.ref=$GIT_REF \
	--label ca.uhn.techna.$PROJECT.branch="$GIT_BRANCH" \
	"$SELFDIR"
