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
              { name: 'posts', url: 'http://localhost:3000/graphql' },
            ],
          }),
        },
      }
}