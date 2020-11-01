#! /bin/bash

echo "Waiting database..."

while ! nc -z db 5432;
do
  sleep 1
done

echo "Database ready to use"

echo "Runing migrations..."
yarn typeorm migration:run
echo "Done!"

ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/shared/infra/http/server.ts
