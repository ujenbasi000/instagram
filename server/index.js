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
// @ts-ignore
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";
import dbConnect from "./configs/db.js";
dotenv.config();

const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "https://studio.apollographql.com"],
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
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app, cors: corsOptions });
  app.listen({ port: process.env.PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
})();
