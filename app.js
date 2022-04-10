import express from "express";
import restaurantRoutes from "./routes/restaurants.js";
import menuRoutes from "./routes/menu.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import orderRoutes from "./routes/order.js";
import cors from "cors"

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

const app = express();
app.use(SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(cors())
app.use(restaurantRoutes);
app.use(menuRoutes);
app.use(orderRoutes);

export default app
