import {Router} from "express";
import {postOrder, getAllOrder} from "../controllers/order.js"

const router = Router()


/**
 * @swagger
 * /api/menu/:
 *   get:
 *     summary: Post an order
 *     responses:
 *       '200':
 *         description: A successful response
 *         schema:
 *           type: json
 */
router.post('/api/order', postOrder)
router.get('/api/order', getAllOrder)


export default router