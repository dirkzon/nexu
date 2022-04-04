import { RemoteGraphQLDataSource } from "@apollo/gateway";

export class dataSourceMethods extends RemoteGraphQLDataSource {
    willSendRequest({ request, context }) {
        request.http.headers.set('jwt', context['jwt']);
    }

    didEncounterError(error, fetchRequest, fetchResponse, context) {
        throw error;
    }
}