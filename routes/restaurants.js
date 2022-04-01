import {Router} from "express";
import {getAll} from '../controllers/restaurants.js'

const router = Router()

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get a list of nearby restaurants
 *     responses:
 *       '200':
 *         description: A successful response
 */
router.get('/api/restaurants', getAll)

export default router
