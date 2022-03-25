import {Router} from "express";
import {get} from '../controllers/menu.js'

const router = Router()

router.get('/api/menu/:id', get)

export default router
