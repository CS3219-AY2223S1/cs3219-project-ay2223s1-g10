# CS3219-AY22-23

## Prerequisites to be installed

Please install the following applications/software before proceeding to use/evolve the project
skeleton.

- Nodejs (and the npm that comes with it)
- nodemon
- create-react-app
- Any IDE of your choice
- Any Git client
- MongoDB Community Server
- MongoShell
- MongoDB Compass (Optional)
- Docker

## User Service

1. Copy `.env.example` file as `.env`.
2. Update the relevant environment variables
3. Install npm packages using `npm i`.
4. Run User Service using `npm run dev`.

## Matching Service

1. Copy `.env.example` file as `.env`.
2. Update the relevant environment variables
3. Install npm packages using `npm i`.
4. Run `docker run -d -e POSTGRES_PASSWORD=root -p 5455:5432 postgres`
5. Run `npx prisma migrate dev` to update data in db or `npx prisma migrate reset` to reset db
6. Run User Service using `npm run dev`.

## Communication Service

1. Copy `.env.example` file as `.env`.
2. Update the relevant environment variables
3. Install npm packages using `npm i`.
4. Run User Service using `npm run dev`.

## Collaboration Service

1. Copy `.env.example` file as `.env`.
2. Update the relevant environment variables
3. Install npm packages using `npm i`.
4. Run `docker compose up` to start redis
5. Run Collaboration Service using `npm run dev`.

## Question service

1. Copy `.env.example` file as `.env`.
2. Update the relevant environment variables
3. Install npm packages using `npm i`.
4. Run Question Service using `npm run dev`.

## History service

1. Copy `.env.example` file as `.env`.
2. Update the relevant environment variables
3. Install npm packages using `npm i`.
4. Run History Service using `npm run dev`.

## Frontend

1. Install npm packages using `npm i`.
2. Run Frontend using `npm start`.

## Starting with Docker compose instead (Alternate way to start up)

1. Update all the relevant environment variables across all the services.
2. Run docker compose up on the root of the project (this will start all the microservices except for frontend).
3. Follow the instruction at [Frontend](#Frontend) to start the frontend service.

## Generating API Documentation

1. Follow the instructions [here](https://github.com/thedevsaddam/docgen) to install docgen
2. Export postman collection as Collection v2.1 to docs/peerdep-api directory
3. Run `docgen build -i peerdep-api.postman_collection.json -o api-doc.md -m` to generate documentation
