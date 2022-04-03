import express from 'express'
import restaurantRoutes from './routes/restaurants.js'
import menuRoutes from './routes/menu.js'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { importSchema } from "graphql-import";
import Query from "./resolvers/Query.js"
// import { ApolloServer, PubSub } from "apollo-server-express";
import { createServer } from '@graphql-yoga/node'
import { useApolloServerErrors } from '@envelop/apollo-server-errors'
const app = express()
const PORT = process.env.NODEJS_PORT ?? 80

const typeDefs = importSchema("./schema.graphql");
const graphQLServer = new createServer({
    schema: {
        typeDefs,
        resolvers:{
            Query
        }
    },
    plugins: [useApolloServerErrors()]
})

const SWAGGER_URL = "/docs"

// https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Restaurant customer API',
            description: 'Menus and restaurants',
            contact: {
                name: 'Ilya'
            },
            servers: ["http://localhost"]
        }
    },
    apis: ['routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use(SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(restaurantRoutes)
app.use(menuRoutes)
app.use('/graphql', graphQLServer)


app.listen(PORT, () => {
    console.log(`server has been started on ${PORT}`)
})