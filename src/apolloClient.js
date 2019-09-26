import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from 'apollo-link';

const httpLink = createHttpLink({ uri: "http://localhost:4000" });


const consoleLink = new ApolloLink((operation, forward) => {
  console.log(`starting request for ${operation.operationName}`);
  return forward(operation).map((data) => {
    console.log(`ending request for ${operation.operationName}`);
    return data;
  })
})

const client = new ApolloClient({
  link: ApolloLink.from([consoleLink, httpLink]),
  cache: new InMemoryCache()
});

export default client