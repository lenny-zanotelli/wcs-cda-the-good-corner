import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express, { Express } from 'express';
import http from 'http';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import dataSource from "../config/db";
import { AdResolver } from "./resolvers/ad.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { TagResolver } from "./resolvers/tag.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import Cookies from "cookies";
import * as jwt from "jsonwebtoken";


export interface JWTContext {
  req: express.Request;
  res: express.Response;
}

const port: number = 4000;
const app: Express = express();
const httpServer = http.createServer(app);

async function start() {
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: ({ context }) => {
      if (context.email) {
        return true;
      } else {
        return false;
      }
    }
  });
  const server = new ApolloServer<JWTContext>({ 
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: "*",
      credentials: true,
    }),
    express.json({ limit: '50mb'}),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const cookies = new Cookies(req,res);
        const token = cookies.get("token");
        console.log("token", token);
        if (token) {
          const payload = jwt.verify(token, "secret");
          console.log("payload", payload);
          return { req, res, payload };
        }
        return { req, res };
      }
    }),
  );
  await dataSource.initialize();

  await new Promise<void>((resolve) => 
    httpServer.listen({ port: port}, resolve)
  );
  console.log(`🚀  Server ready at: http://localhost:${port}`)
}

start();

// const port: number = 4000;
// const app: Express = express();

// app.use(cors<cors.CorsRequest>({
//   origin: ["http://localhost:3000", "http://studio.apollographql.com"],
//   credentials: true,
// })
// );
// app.use(express.json());


// async function start() {
//   await dataSource.initialize();
//   const schema = await buildSchema({
//     resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
//   })
//   const server = new ApolloServer({ schema })
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: port },
//     context: async ({ req }) => {

//     },
//   });

//   console.log(`🚀  Server ready at: ${url}`)
// }
// start();
