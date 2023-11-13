set -a
. /etc/environment
set +a
docker compose build --no-cache frontend \
--build-arg CTIMS_WEB_PORT=3000 \
   --build-arg NEXTAUTH_SECRET=dAbxJF2DRzqwGYn+BWKdj8o9ieMri4FWsmIRn77r2F8= \
   --build-arg REACT_APP_API_URL=https://ctims-api.qa02.technainstitute.net/api \
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

