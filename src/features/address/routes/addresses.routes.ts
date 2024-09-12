import express from 'express'
import { addressesController } from '../controllers/addresss.controller' // Adjust path as necessary
import { isLoggedIn } from '~/globals/middlewares/auth.middleware'
import { validateBodySchema } from './../../../globals/middlewares/validate.middleware'
import { createAddressSchema, getOneAddressSchema, updateAddressSchema } from '../schemas/addresss.schema'
import { validateParamSchema } from '~/globals/middlewares/validate.middleware'

const addressesRouter = express.Router()
addressesRouter.use(isLoggedIn)

addressesRouter.post('/', validateBodySchema(createAddressSchema), addressesController.create)
addressesRouter.put('/', validateBodySchema(updateAddressSchema), addressesController.update)
addressesRouter.delete('/:id', validateParamSchema(getOneAddressSchema), addressesController.delete)

export default addressesRouter
