import { rule, shield, chain } from "graphql-shield";

enum Scopes {
    CAN_GET_OTHERS = "get:others",
    CAN_GET_SELF = "get:self",
    CAN_SEARCH_USERS = "search:others"
}

const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== '' || !user;
});

const canGetUsers = rule()((parent, args, { user }) => {
    return user.scope.includes(Scopes.CAN_GET_OTHERS);
});

const canGetSelf = rule()((parent, args, { user }) => {
    return user.scope.includes(Scopes.CAN_GET_SELF);
});

const canSearchUsers = rule()((parent, args, { user }) => {
    return user.scope.includes(Scopes.CAN_SEARCH_USERS);
});

export const permissions = shield({
    Query: {
        GetUserById: chain(isAuthenticated, canGetUsers),
        getSelf: chain(isAuthenticated, canGetSelf),
        SearchUsers: chain(isAuthenticated, canSearchUsers),
    },
    Mutation: {
        UpdateSelf: isAuthenticated,
        DeleteSelf: isAuthenticated,
    }
  }, {allowExternalErrors: true});