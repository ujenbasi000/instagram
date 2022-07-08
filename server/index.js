import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import typeDefs from "./types/index.js";
import UserQuery from "./resolvers/user.query.js";
import userMutations from "./resolvers/user.mutation.js";
import dbConnect from "./configs/db.js";
dotenv.config();

const resolvers = {
  Query: {
    ...UserQuery,
  },
  Mutation: {
    ...userMutations,
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
  server.applyMiddleware({ app });
  app.listen({ port: process.env.PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}/${server.graphqlPath}`
    )
  );
})();
