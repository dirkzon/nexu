import { RemoteGraphQLDataSource } from "@apollo/gateway";

export class dataSourceMethods extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        if (!!context.req) {
            request.http.headers.set('user', context.req.headers.user);
        }       
    }
}