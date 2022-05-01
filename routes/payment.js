import {Router} from "express";
import {postPayment} from "../controllers/payment.js"

const router = Router()

router.post('/payment', postPayment)

export default router