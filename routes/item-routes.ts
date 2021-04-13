import { Router } from 'express'
import { add, remove, update } from '../controllers/item-handler'
const router = Router()

router.post('/create', add)
router.post('/update', update)
router.post('/remove', remove)

export default router
