import { Router } from 'express'
import { create, retrieve } from '../controllers/order-handler'

const router = Router()

router.post('/create', create)
router.get('/retrieve', retrieve)

export default router
