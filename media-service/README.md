<p align="center" style="text-align: center">
  <img src="../docs/nexu_logo_with_name.svg" width="320" alt="Architect Logo" /></a>
</p>

# Media service
 The media service handles all the logic regarding the media like images and videos. The features are:

- [X] Uploading & hosting images on Azure
- [x] Normalizing images
  - [x] setting aspect ratio
  - [x] Setting limiting resolution 

## Tech Stack
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest.js"/></a>

<a href="https://azure.microsoft.com/" target="blank"><img src="https://www.daltonnet.co.uk/wp-content/uploads/2018/11/microsoft_azure-card.png" width="125" alt="MongoDB"/></a>

<a href="https://www.rabbitmq.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/7/71/RabbitMQ_logo.svg" width="135" alt="RabbitMQ"/></a>

<a href="https://pnpm.io/" target="blank"><img src="https://d33wubrfki0l68.cloudfront.net/aad219b6c931cebb53121dcda794f6180d9e4397/17f34/assets/images/pnpm-standard-79c9dbb2e99b8525ae55174580061e1b.svg" width="50" alt="PNPM"/></a>


## Architecture
This services is built with the Hexagonal pattern with CQRS.

![Media-service architecture but the image is gone (╯°□°）╯︵ ┻━┻](./docs/media-service%20architecture.svg)

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
Access the rest endpoints through `localhost:1000/images`

## Docker
```bash
# run MongoDB and RabbitMQ
$ docker-compose up
``` 