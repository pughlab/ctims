# Running CTIMS with docker

To deploy CTIMS using Docker, follow these steps:

1. Clone the repository
2. Make a copy of the example environment file:
3. `cp .env.example .env`
4. Modify the .env file with the necessary keycloak environment variables.



* KEYCLOAK\_CLIENT\_SECRET is the keycloak client secret
* NEXT\_AUTH\_API\_URL is the authentication through next.js authentication, the value should point to \<name of backend image>:port/api
  * Example:&#x20;
    1. NEXT\_AUTH\_API\_URL=[http://backend:3333/api](http://backend:3333/api)  for working with docker
    2. NEXT\_AUTH\_API\_URL=[http://localhost:3333/api](http://localhost:3333/api) for local development
* PRISMA\_FIELD\_ENCRYPTION\_KEY is the key used for encrypting the contents of the database so that trial information is kept secure.&#x20;

1. Build the docker images using \`docker-compose build --no-cache\`
2. Run the Docker containers using \`docker-compose up\`
3. Access CTIMS in your browser at \`http://localhost:3000\`.
