import { Router } from 'express'
import { addItem } from '../controllers/item-handler'
const router = Router()

router.post('/create', addItem)
//TODO
router.post('/update')
router.post('/delete')

export default router
