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
import { User } from "./entities/user";
import { customAuthChecker } from "./lib/authChecker";


export interface JWTContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
}

const port: number = 4000;
const app: Express = express();
const httpServer = http.createServer(app);

async function start() {
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],
    authChecker: customAuthChecker
  });
  const server = new ApolloServer<JWTContext>({ 
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    express.json({ limit: '50mb'}),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: User | null = null;
        const cookies = new Cookies(req, res);
        const token = cookies.get("token");
        if (token) {
          try {
            const verify = jwt.verify(token, 'secret') as string;
            
            user = await User.findOneByOrFail({ email: verify });
            console.log("payload", user);
          } catch (error) {
            console.log(error);
            
          }
        }
        return { req, res, user };
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

