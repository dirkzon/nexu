import { RemoteGraphQLDataSource } from "@apollo/gateway";

export class dataSourceMethods extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        if (!!context.req) {
            if(!!context.req.headers.user){
                request.http.headers.set('user', context.req.headers.user);
            }
        }     
    }
}