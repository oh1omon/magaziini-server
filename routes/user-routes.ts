import { Router } from 'express'
import { login, register, retrieve, signout } from '../controllers/user-handler'
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/user', retrieve)
router.post('/signout', signout)
router.post('/update')
//TODO

export default router