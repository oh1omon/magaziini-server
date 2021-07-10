import { Router } from 'express'
import { addSub } from '../controllers/sub-handler'

const router = Router()

router.post('/add', addSub)

export default router
