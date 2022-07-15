import { ApolloProvider } from "@apollo/client";
import Context from "../helpers/ctx";
import client from "../helpers/database";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Context>
        <Component {...pageProps} />
      </Context>
    </ApolloProvider>
  );
}

export default MyApp;
