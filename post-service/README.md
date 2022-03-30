<p align="center" style="text-align: center">
  <img src="../docs/nexu_logo_with_name.svg" width="320" alt="Architect Logo" /></a>
</p>

# Post service
 The post service handles all the logic regarding the posts. The features are:

- [X] Creating posts
- [ ] Deleting posts 
- [x] Get post by id
- [ ] Get all posts from user
  - [ ] Use pagination

## Tech Stack
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest Logo"/></a>

<a href="https://www.mongodb.com/" target="blank"><img src="https://webimages.mongodb.com/_com_assets/cms/kusb9stg1ndrp7j53-MongoDBLogoBrand1.png" width="150" alt="Mongo Logo"/></a>


## Architecture
This services is built with the Hexagonal pattern with CQRS.

![Post-service architecture but the image is gone (╯°□°）╯︵ ┻━┻](./docs/post-service%20architecture.svg)

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
Access the GraphQL playground through `localhost:3000/graphql`

## Docker
```bash
# run MongoDB and RabbitMQ
$ docker-compose up
``` 