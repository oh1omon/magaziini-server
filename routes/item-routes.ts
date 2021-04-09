import { Router } from 'express'
import { addItem } from '../controllers/item-handler'
const router = Router()

//TODO
router.post('/additem', addItem)

export default router
