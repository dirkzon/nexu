<p align="center" style="text-align: center">
  <img src="../docs/nexu_logo_with_name.svg" width="320" alt="Architect Logo" /></a>
</p>

# API gateway
This api gateway works with Apollo Federation to create a single GraphQL endpoint for Nexu. 
![gateway subgraph example ╰(*°▽°*)╯. based on https://www.apollographql.com/docs/federation/](./docs/api-gateway%20architecture.svg)
In the example above you can see that the subgraphs of some services are combined within the API-gateway to create a single graph which the client is able to query. 

## Tech Stack
<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="100" alt="Nest.js"/></a>

<a href="https://www.apollographql.com/docs/federation" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/apollo-graphql-1.svg" width="130" alt="Apollo"/></a>

<a href="https://pnpm.io/" target="blank"><img src="https://d33wubrfki0l68.cloudfront.net/aad219b6c931cebb53121dcda794f6180d9e4397/17f34/assets/images/pnpm-standard-79c9dbb2e99b8525ae55174580061e1b.svg" width="50" alt="PNPM"/></a>

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

# test coverage
$ pnpm run test:cov
```

## Playground
Access the GraphQL playground through `localhost:5000/graphql`
