import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "http://localhost:3001/graphql",
});

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  link: uploadLink,
  credentials: "include", // very very important to store cookie in client side
});

export default client;
