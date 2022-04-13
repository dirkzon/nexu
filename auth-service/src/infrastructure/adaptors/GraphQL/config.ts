import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";

const { NODE_ENV } = process.env;

export function GraphQLConfig(): ApolloDriverConfig {
    return {
        logger: console,
        driver: ApolloFederationDriver,
        debug: false,
        playground: NODE_ENV !== 'prod',
        autoSchemaFile: 'authschema.gql',
    }
}
