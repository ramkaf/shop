import express from 'express'
import { addressesController } from '../controllers/address.controller' // Adjust path as necessary
import { isLoggedIn } from '~/globals/middlewares/auth.middleware'
import { validateBodySchema, validateQuerySchema } from './../../../globals/middlewares/validate.middleware'
import { createAddressSchema, getCityOfProvinceSchema, getOneAddressSchema, updateAddressSchema } from '../schemas/address.schema'
import { validateParamSchema } from '~/globals/middlewares/validate.middleware'

const addressesRouter = express.Router()
addressesRouter.use(isLoggedIn)

addressesRouter.get('/province', addressesController.getProvinces)
addressesRouter.get('/city/:province_id',validateParamSchema(getCityOfProvinceSchema), addressesController.getCityOfProvince)
addressesRouter.post('/', validateBodySchema(createAddressSchema), addressesController.create)
addressesRouter.put('/', validateBodySchema(updateAddressSchema), addressesController.update)
addressesRouter.delete('/:id', validateParamSchema(getOneAddressSchema), addressesController.delete)

export default addressesRouter
