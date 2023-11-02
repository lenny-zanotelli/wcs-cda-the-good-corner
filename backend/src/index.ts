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

const port: number = 4000;
const app: Express = express();


app.use(cors())
app.use(express.json());


// app.get('/ad', adsController.read);
// app.get('/ad/:id', adsController.findOne);
// app.post('/ad', adsController.create);
// app.delete('/ad', adsController.delete);
// app.put('/ad', adsController.put);

// app.get('/category', categoryController.read);
// app.post('/category', categoryController.create);
// app.delete('/category', categoryController.delete);
// app.put('/category', categoryController.put);

// app.get('/tag', tagController.read);
// app.post('/tag', tagController.create);
// app.delete('/tag', tagController.delete);
// app.put('/tag', tagController.put);

async function start() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  })
  const server = new ApolloServer({ schema })
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  console.log(`🚀  Server ready at: ${url}`)
}
start();


// app.listen(port, async () => {
//   await dataSource.initialize();
//   console.log(`Example app listening on port ${port}`)
// });