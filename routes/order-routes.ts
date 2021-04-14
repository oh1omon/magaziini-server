import { Router } from 'express'
import { create } from '../controllers/order-handler'
const router = Router()

router.post('/create', create)

export default router
