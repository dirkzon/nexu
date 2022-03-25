# Post service
 The post service handles all the logic regarding the posts which this includes 

- Creating posts
- Deleting posts 

## Tech Stack
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest Logo"/></a>

<a href="https://www.mongodb.com/" target="blank"><img src="https://webimages.mongodb.com/_com_assets/cms/kusb9stg1ndrp7j53-MongoDBLogoBrand1.png" width="110" alt="Mongo Logo"/></a>


## Architecture
This services is built with the Hexagonal pattern with CQRS.

![post-service architecture](./docs/post-service%20architecture.svg)

## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```