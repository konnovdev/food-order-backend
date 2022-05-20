import express from "express";
import restaurantRoutes from "./routes/restaurants.js";
import menuRoutes from "./routes/menu.js";
import paymentRouter from "./routes/payment.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import orderRoutes from "./routes/order.js";
import commentRoutes from "./routes/comment.js";
import tradeHistoryRoutes from "./routes/tradeHistory.js"
import cors from "cors"
import {graphqlUploadExpress} from 'graphql-upload';

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
app.use(paymentRouter);
app.use(commentRoutes);
app.use(tradeHistoryRoutes);
 // This middleware should be added before calling `applyMiddleware`.
app.use(graphqlUploadExpress());
app.use(express.static("public"))
export default app
