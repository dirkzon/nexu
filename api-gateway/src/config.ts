import { IntrospectAndCompose } from "@apollo/gateway";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";

export function GraphQLConfig(): ApolloGatewayDriverConfig {
    return {
        driver: ApolloGatewayDriver,
        server: {
          logger: console,
          playground: true,
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              { name: 'posts', url: 'http://localhost:3000/graphql' },
            ],
          }),
        }
      }
}