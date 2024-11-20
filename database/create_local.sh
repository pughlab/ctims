#!/bin/bash

# Set up MySQL variables
MYSQL_ROOT_PASSWORD="ctims"
MYSQL_USER="ctims"
MYSQL_PASSWORD="ctims"
MYSQL_DATABASE="ctims"

# Start MySQL service
mysql.server start

# Wait for MySQL to start
echo "Waiting for MySQL to start..."
until mysqladmin ping --silent; do
  sleep 1
done
echo "MySQL started."

# Create MySQL user and database
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE USER '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE $MYSQL_DATABASE;"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'localhost';"
mysql -u root -p"$MYSQL_ROOT_PASSWORD" -e "FLUSH PRIVILEGES;"

# Run Prisma generate client
yarn schema:generate-client

# Run Prisma client push
yarn schema:push

# Seed the database with CTML schema
yarn prisma db seed
