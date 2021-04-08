import { Router } from 'express'
import { addItem } from '../controllers/itemHandler'
const router = Router()

router.post('/additem', addItem)

export default router
