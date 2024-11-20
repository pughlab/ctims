set -a
. /etc/environment
set +a
docker compose build --no-cache frontend
