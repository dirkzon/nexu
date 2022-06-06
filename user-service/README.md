<p align="center" style="text-align: center">
  <img src="../docs/nexu_logo_with_name.svg" width="320" alt="Architect Logo" /></a>
</p>

# User service
 The user service handles all the logic regarding the the users. The features are:

- [x] create user
- [x] update user
- [x] delete user
- [x] searching users
- [x] uploading avatar
- [x] updating avatar

## Tech Stack
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest.js"/></a>

<a href="https://www.mongodb.com/" target="blank"><img src="https://webimages.mongodb.com/_com_assets/cms/kusb9stg1ndrp7j53-MongoDBLogoBrand1.png" width="150" alt="MongoDB"/></a>

<a href="https://www.rabbitmq.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/7/71/RabbitMQ_logo.svg" width="135" alt="RabbitMQ"/></a>

<a href="https://pnpm.io/" target="blank"><img src="https://d33wubrfki0l68.cloudfront.net/aad219b6c931cebb53121dcda794f6180d9e4397/17f34/assets/images/pnpm-standard-79c9dbb2e99b8525ae55174580061e1b.svg" width="50" alt="PNPM"/></a>


## Architecture
This services is built with the Hexagonal pattern with CQRS.

![User-service architecture but the image is gone (╯°□°）╯︵ ┻━┻](./docs/user-service%20architecture.svg)

## Installation
```bash
$ pnpm install
```

## Running the app
```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Playground
Access the GraphQL playground through `localhost:2000/graphql`

## Docker
```bash
# run MongoDB and RabbitMQ
$ docker-compose up
``` 