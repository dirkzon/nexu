import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";

export function GraphQLConfig(): ApolloDriverConfig {
    return {
        driver: ApolloFederationDriver,
        debug: false,
        playground: true,
        autoSchemaFile: 'postschema.gql',
    }
}
