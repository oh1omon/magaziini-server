import { Router } from 'express'
import { add, get, remove, update } from '../controllers/item-handler'

const router = Router()

router.post('/create', add)
router.post('/update', update)
router.post('/remove', remove)
router.get('/:item', get)
router.get('/', get)

export default router
