import {Router} from "express";
import { postHistory } from "../controllers/tradeHistory.js";
const router = Router()


/**
 * @swagger
 * /tradeHistory:
 *   post:
 *     summary: help check if the customer make payment
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.post('/tradeHistory', postHistory)

export default router