import { Router } from 'express'
import { login, register, retrieve, signout, update } from '../controllers/user-handler'
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/retrieve', retrieve)
router.post('/signout', signout)
router.post('/update', update)

export default router
