import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { dataSourceMethods } from './dataSourceMethods';

const { NODE_ENV } = process.env;

const localSubGraphs = [
  { name: 'posts', url: 'http://localhost:3000/graphql' },
  { name: 'auth', url: 'http://localhost:4000/graphql' },
  { name: 'users', url: 'http://localhost:2000/graphql' },
  { name: 'comment', url: 'http://localhost:7000/graphql' },
];

const prodSubGraphs = [
  { name: 'posts', url: 'http://post-service:3000/graphql' },
  { name: 'auth', url: 'http://auth-service:4000/graphql' },
  { name: 'users', url: 'http://user-service:2000/graphql' },
  { name: 'comment', url: 'http://localhost:7000/graphql' },
];

export function GraphQLConfig(): ApolloGatewayDriverConfig {
  return {
    driver: ApolloGatewayDriver,
    server: {
      cors: {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
      },
      logger: console,
      playground: true,
    },
    gateway: {
      logger: console,
      buildService({ url }) {
        return new dataSourceMethods({ url });
      },
      supergraphSdl: new IntrospectAndCompose({
        logger: console,
        subgraphHealthCheck: true,
        subgraphs: NODE_ENV === 'prod' ? prodSubGraphs : localSubGraphs,
      }),
    },
  };
}
