import express from 'express'
import { ordersController } from '../controllers/orders.controller' // Adjust path as necessary
import { isLoggedIn } from '~/globals/middlewares/auth.middleware'

const ordersRouter = express.Router()
ordersRouter.use(isLoggedIn)

ordersRouter.get('/', ordersController.getAllOrder)
ordersRouter.get('/:id', ordersController.get)
ordersRouter.post('/', ordersController.create)
// ordersRouter.delete('/:id', ordersController.delete)

export default ordersRouter
