import {Router} from "express";
import {get} from '../controllers/menu.js'

const router = Router()

/**
 * @swagger
 * /menu/{restaurantId}:
 *   get:
 *     summary: Get the entire menu of a restaurant by restaurant ID
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric id of the restaurant
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/menu/:id', get)

export default router
