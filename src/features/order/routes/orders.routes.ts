import express from 'express'
import { ordersController } from '../controllers/orders.controller' // Adjust path as necessary

const ordersRouter = express.Router()

ordersRouter.get('/', ordersController.getAll)
ordersRouter.get('/:id', ordersController.getById)
ordersRouter.post('/', ordersController.create)
ordersRouter.delete('/:id', ordersController.delete)

export default ordersRouter
