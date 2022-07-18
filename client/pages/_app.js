import { ApolloProvider } from "@apollo/client";
import Context from "../helpers/ctx";
import client from "../helpers/database";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Context>
        <NextNProgress
          color="linear-gradient(90deg, rgba(245,96,64,1) 0%, rgba(246,119,55,1) 35%, rgba(225,47,107,1) 100%);"
          height={3}
        />
        <Component {...pageProps} />
      </Context>
    </ApolloProvider>
  );
}

export default MyApp;
