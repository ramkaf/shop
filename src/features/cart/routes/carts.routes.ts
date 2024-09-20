import express from 'express'
import { cartsController } from '../controllers/carts.controller' // Adjust path as necessary
import { validateBodySchema } from './../../../globals/middlewares/validate.middleware'
import { isLoggedIn } from '~/globals/middlewares/auth.middleware'
import { cartItemSchema } from '../schemas/carts.schema'

const cartsRouter = express.Router()
cartsRouter.use(isLoggedIn)

cartsRouter.get('/', cartsController.get)
cartsRouter.post('/', validateBodySchema(cartItemSchema), cartsController.createItem)
cartsRouter.delete('/', validateBodySchema(cartItemSchema), cartsController.deleteItem)

export default cartsRouter
