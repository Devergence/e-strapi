import './env'
import 'reflect-metadata'
import { ApolloServer } from "apollo-server-express";
import express from 'express';
import cors from 'cors';

import createSchema from "../schema";
import createSession from "../session";

const port = process.env.PORT || 8000;

async function createServer() {
  try {
    await createSession();
    const app = express();
    const corsOptions = {
      origin: 'http://localhost:3000',
      credential: true,
    };
    app.use(cors(corsOptions));

    // use JSON request
    app.use(express.json());

    const schema = await createSchema();

    // create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res}) => ({ req, res}),
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      }
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // start the server
    app.listen({ port }, () => {
      console.log(`Server is running at ${port} port ${apolloServer.graphqlPath}`)
    })

  } catch (e) {
    console.log(e)
  }
}

createServer();
