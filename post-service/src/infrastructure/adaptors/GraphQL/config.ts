import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

export function GraphQLConfig(): ApolloDriverConfig {
    return {
        driver: ApolloDriver,
        debug: false,
        playground: true,
        autoSchemaFile: true,
    }
}
