import {Router} from "express";
import {postOrder, getAllOrder} from "../controllers/order.js"

const router = Router()

// TODO add the schema in the parameters
/**
 * @swagger
 * /order/:
 *   post:
 *     summary: Post an order
 *     parameters: [
 *            in: body,
 *            name: body,
 *            description: Order object that needs to be added in body,
 *            required: true,
 *              
 *          ]
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/order', postOrder)

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get a list of orders
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/order', getAllOrder)

export default router