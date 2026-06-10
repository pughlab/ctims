# Running CTIMS Application without Docker

CTIMS uses a mono repo structure, to set up CTIMS for local development, follow these steps:

1. Clone the repository
2. Install the dependencies

```
yarn install
```

3. If prefer to start database without docker, you can run the `database/create_local.sh` script to initialize a mySQL service and seed the database.
4. Can also start the database docker image in `/database`

```
/cd ./database
```

```
docker build -t ctims-db -f Dockerfile .
```

```
docker run -d -p 3306:3306 ctims-db:latest
```

5. Make a copy of the frontend environment file `apps/web/.env.local.example`

```
cp apps/web/.env.local.example apps/web/.env
```

6. &#x20;If running on different port, modify the `.env` file with any environment variables or port number changes
7. &#x20;Make a copy of the backend environment file `apps/api/.env.example`

```
cp apps/api/.env.example apps/api/.env
```

8. &#x20;Modify the `.env` file with the necessary keycloak environment variables.
9. &#x20;If there are changes to the CTML schema, use Prisma ORM to initiate the database, first generate the Prisma client

```
yarn run schema:generate-client
```

10. &#x20;You can use the `schema:format` task to format the schema if there are modifications. Push the schema to the database

```
yarn run schema:push
```

11. &#x20;Start the frontend and backend with the following target

```
yarn run start:backend
```

```
yarn run start-web
```

12. &#x20;Access CTIMS in your browser at `http://localhost:3000`.

\
<br>
