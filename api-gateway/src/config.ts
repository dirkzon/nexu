import { IntrospectAndCompose } from "@apollo/gateway";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { dataSourceMethods } from "./dataSourceMethods";

export function GraphQLConfig(): ApolloGatewayDriverConfig {
    return {
        driver: ApolloGatewayDriver,
        server: {
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
            subgraphs: [
              { name: 'posts', url: 'http://post-service:3000/graphql' },
              { name: 'auth', url: 'http://auth-service:4000/graphql' },
              { name:'users', url: 'http://user-service:2000/graphql' },
            ],
          }),
        },
      }
}