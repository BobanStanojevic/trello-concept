import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

import typeDefs from "./schema";
import resolvers from "./resolvers/index.js";

mongoose.connect("mongodb://localhost:27017/trello");

const port = 3009;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });
app.use(cors);

app.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
});
