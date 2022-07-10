import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import typeDefs from "./types/index.js";
import {
  UserQuery,
  UserMutation,
  PostQuery,
  PostMutation,
  SaveQuery,
  SaveMutation,
} from "./resolvers/index.js";
import CookieParser from "cookie-parser";

import dbConnect from "./configs/db.js";
dotenv.config();

const corsOptions = {
  origin: true,
  credentials: true,
};

const resolvers = {
  Query: {
    ...UserQuery,
    ...PostQuery,
    ...SaveQuery,
  },
  Mutation: {
    ...UserMutation,
    ...PostMutation,
    ...SaveMutation,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const app = express();
(async () => {
  await server.start();
  dbConnect();
  app.use(CookieParser());
  server.applyMiddleware({ app, cors: corsOptions });
  app.listen({ port: process.env.PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}/${server.graphqlPath}`
    )
  );
})();
