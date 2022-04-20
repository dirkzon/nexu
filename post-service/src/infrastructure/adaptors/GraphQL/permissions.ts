import { rule, shield, and, chain } from "graphql-shield";

enum Scopes {
    CAN_MAKE_POST = "create:post"
}

const isAuthenticated = rule()((parent, args, { user }) => {
    return user !== '' || !user;
});

const canMakePost = rule()((parent, args, { user }) => {
    return user.scope.includes(Scopes.CAN_MAKE_POST);
});

export const permissions = shield({
    Query: {
        GetPostById: isAuthenticated,
    },
    Mutation: {
        CreatePost: chain(isAuthenticated, canMakePost),
    }
  });