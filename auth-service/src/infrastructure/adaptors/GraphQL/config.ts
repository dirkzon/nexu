import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";

export function GraphQLConfig(): ApolloDriverConfig {
    return {
        logger: console,
        driver: ApolloFederationDriver,
        debug: false,
        playground: true,
        autoSchemaFile: 'authschema.gql',
    }
}
