import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from 'apollo-link-ws'
import { SubscriptionClient } from "subscriptions-transport-ws";
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities'

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });
const wsClient = new SubscriptionClient("ws://localhost:4000/graphql", {
  reconnect: true,
  connectionParams: {}
});
const wsLink = new WebSocketLink(wsClient)

const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);
  return forward(operation)
})

const networkLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: ApolloLink.from([consoleLink, networkLink]),
  cache: new InMemoryCache()
});

export default client