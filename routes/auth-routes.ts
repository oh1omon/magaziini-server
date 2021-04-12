import { Router } from 'express'
const router = Router()
import { register, login, retrieve, signout } from '../controllers/auth-handler'

router.post('/register', register)
router.post('/login', login)
router.post('/user', retrieve)
router.post('/signout', signout)
//TODO

export default router