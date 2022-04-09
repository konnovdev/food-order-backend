import express from "express";
import restaurantRoutes from "./routes/restaurants.js";
import menuRoutes from "./routes/menu.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { importSchema } from "graphql-import";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import orderRoutes from "./routes/order.js";
import { ApolloServer } from "apollo-server-express";
import { PubSub } from 'graphql-subscriptions';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {SubscriptionServer} from "subscriptions-transport-ws"
import cors from "cors"
import {execute, subscribe} from "graphql"



const app = express();
const PORT = process.env.NODEJS_PORT ?? 80;



const SWAGGER_URL = "/docs";

// https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Restaurant customer API",
      description: "Menus and restaurants",
      contact: {
        name: "Ilya",
      },
      servers: ["http://localhost"],
    },
  },
  apis: ["routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(cors())
app.use(restaurantRoutes);
app.use(menuRoutes);
app.use(orderRoutes);


const typeDefs = importSchema("./schema.graphql");
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
});
const httpServer = createServer(app);

const server = new ApolloServer({
    typeDefs,
    //todo pass context to resolver
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
});
await server.start();
server.applyMiddleware({ app });
SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );
httpServer.listen(PORT, () => {
    console.log(`🚀 server has been started on ${PORT}`,);
});


// app.listen(PORT, () => {
//     console.log(`server has been started on ${PORT}`)
// })