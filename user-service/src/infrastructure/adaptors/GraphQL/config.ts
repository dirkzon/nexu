import { ApolloDriverConfig, ApolloFederationDriver } from "@nestjs/apollo";
import jwt_decode from "jwt-decode";
import { GraphQLSchema } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./permissions";


const { NODE_ENV } = process.env;

export function GraphQLConfig(): ApolloDriverConfig {
    return {
        logger: console,
        driver: ApolloFederationDriver,
        debug: false,
        playground: NODE_ENV !== 'prod',
        autoSchemaFile: 'userschema.gql',
        transformSchema: (schema: GraphQLSchema) => { 
            return applyMiddleware(schema, permissions);
        },
        context: ({ req }) => {
            const jwt: string = req.headers.user;
            if (!jwt) return {};
            const data = jwt_decode(jwt);
            const user = {
                user: data['user_name'],
                id: data['id'],
                scope: data['scope'],
            }
            return { user };
        }
    }
}
