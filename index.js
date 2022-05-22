import {importSchema} from "graphql-import";
import {Query} from "./resolvers/Query.js";
import {setLang} from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import {ApolloServer} from "apollo-server-express";
import {createServer} from 'http';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {SubscriptionServer} from "subscriptions-transport-ws"
import {execute, subscribe} from "graphql"
import app from "./app.js"
import {GraphQLUpload} from 'graphql-upload';

const PORT = process.env.NODEJS_PORT ?? 80;
const {schema, server} = setUpGraphqlServer();

function setUpGraphqlServer() {
    const typeDefs = importSchema("./schema.graphql");
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers: {
            Upload: GraphQLUpload,
            Query,
            Mutation,
            Subscription,
        },
    });
    const server = new ApolloServer({
        typeDefs,
        //todo pass context to resolver
        resolvers: {
            Query,
            Mutation,
            Subscription,
        },
        context: ({req}) => {
            setLang(req.headers["content-language"])
        },
    });
    return {schema, server};
}

const httpServer = createServer(app);
await server.start();


server.applyMiddleware({app});
SubscriptionServer.create(
    {schema, execute, subscribe},
    {server: httpServer, path: server.graphqlPath}
);

httpServer.listen(PORT, () => {
    console.log(`🚀 server has been started on ${PORT}`,);
});