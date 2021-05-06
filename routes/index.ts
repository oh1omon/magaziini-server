import express from 'express'
import itemRoutes from './item-routes'
import orderRoutes from './order-routes'
import userRoutes from './user-routes'
const router = express.Router()

//Setting serve to be able serve static images
router.use('/images', express.static('images'))
router.use('/user', userRoutes)
router.use('/order', orderRoutes)
router.use('/item', itemRoutes)

export default router
