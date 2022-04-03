import express from 'express'
import restaurantRoutes from './routes/restaurants.js'
import menuRoutes from './routes/menu.js'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app = express()
const PORT = process.env.NODEJS_PORT ?? 80

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

app.listen(PORT, () => {
    console.log(`server has been started on ${PORT}`)
})