import {Router} from "express";
import {getAll} from '../controllers/restaurants.js'

const router = Router()

router.get('/api/restaurants', getAll)

export default router
