import { rule, shield, chain } from 'graphql-shield';

enum Scopes {
  CAN_CREATE_COMMENT = 'create:comment',
}

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== '' || !user;
});

const canMakeComment = rule()((parent, args, { user }) => {
  return user.scope.includes(Scopes.CAN_CREATE_COMMENT);
});

export const permissions = shield(
  {
    Query: {},
    Mutation: {
      CreateComment: chain(isAuthenticated, canMakeComment),
    },
  },
  { allowExternalErrors: true },
);
