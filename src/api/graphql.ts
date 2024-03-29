import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { WEBSOCKET_URL, BASE_URL } from "@config";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = (token: string) =>
  new GraphQLWsLink(
    createClient({
      url: WEBSOCKET_URL + `?token=${token}`
    })
  );

const httpLink = (token: string) => {
  return new HttpLink({
    uri: `${BASE_URL}/graphql`,
    headers: {
      authorization: `Bearer ${token}`
    },
    fetchOptions: {
      cors: true
    }
  });
};

const splitLink = (token: string) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink(token),
    httpLink(token)
  );

export const initializeClient = (token: string) => {
  return new ApolloClient({
    link: splitLink(token),
    cache: new InMemoryCache()
  });
};
