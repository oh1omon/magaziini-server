import express from 'express'
import itemRoutes from './item-routes'
import orderRoutes from './order-routes'
import subRoutes from './sub-routes'
import userRoutes from './user-routes'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/order', orderRoutes)
router.use('/item', itemRoutes)
router.use('/sub', subRoutes)

export default router
