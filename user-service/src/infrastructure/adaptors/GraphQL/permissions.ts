import { rule, shield, chain } from "graphql-shield";

enum Scopes {
    CAN_GET_OTHER_USERS = "get:other-users",
    CAN_GET_SELF = "get:self",
}

const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== '' || !user;
});

const canGetOtherUsers = rule()((parent, args, { user }) => {
    return user.scope.includes(Scopes.CAN_GET_OTHER_USERS);
});

const canGetSelf = rule()((parent, args, { user }) => {
    return user.scope.includes(Scopes.CAN_GET_SELF);
});

export const permissions = shield({
    Query: {
        GetUserById: chain(isAuthenticated, canGetOtherUsers),
        getSelf: chain(isAuthenticated, canGetSelf),
    },
    Mutation: {
        UpdateSelf: isAuthenticated,
    }
  });