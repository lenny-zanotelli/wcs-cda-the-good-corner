import "reflect-metadata";
import express, { Express } from 'express';
import cors from 'cors';
import dataSource from "../config/db";
import { ApolloServer } from "@apollo/server"
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone"
// import adsController from "./controllers/adsController";
// import categoryController from "./controllers/categoryController";
// import tagController from "./controllers/tagController";
import { AdResolver } from "./resolvers/ad.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { TagResolver } from "./resolvers/tag.resolver";
import { UserResolver } from "./resolvers/user.resolver";

const port: number = 4000;
const app: Express = express();

app.use(cors())
app.use(express.json());

async function start() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
  })
  const server = new ApolloServer({ schema })
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  console.log(`🚀  Server ready at: ${url}`)
}
start();
