import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Express } from 'express';
import "reflect-metadata";
import { buildSchema } from "type-graphql";

import dataSource from "../config/datasource";

import http from 'http';
import { AdResolver } from "./resolvers/ad.resolver";
import { CategoryResolver } from "./resolvers/category.resolver";
import { TagResolver } from "./resolvers/tag.resolver";

import Cookies from "cookies";
import cors from 'cors';

import { customAuthChecker } from "./lib/authChecker";
import { User } from "./entities/user.entity";

export interface JWTContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
} 

/*
  TODO: 
    - FRONT: mettre en place le dashboard ADMIN pour modifier le role des users
    - FRONT: PROTEGER la creation de Ad et son update

 */

const port: number = 4000;
const app: Express = express();
const httpServer = http.createServer(app);

async function start() {
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
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
        let user: User | null = new User();

        const cookies = new Cookies(req, res);
        const token = cookies.get("token");
        if (token) {

          // const payload = jwt.verify(token, 'secret') as jwt.JwtPayload;

          // user = await User.findOneByOrFail({ email: payload.email });

        }
        return { req, res, user } as JWTContext;
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

