import { Router } from 'express'
import { add, remove, update } from '../controllers/item-handler'
import upload from '../controllers/multer-config'
const router = Router()

router.post('/create', upload.single('photo'), add)
router.post('/update', upload.single('photo'), update)
router.post('/remove', remove)

export default router
