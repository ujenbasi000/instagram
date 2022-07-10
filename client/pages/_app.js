import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Header } from "../components";
import Context from "../helpers/ctx";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Context>
        <Header />
        <Component {...pageProps} />
      </Context>
    </ApolloProvider>
  );
}

export default MyApp;
