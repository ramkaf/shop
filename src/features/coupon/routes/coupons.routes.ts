import express from 'express'
import { couponsController } from '../controllers/coupons.controller' // Adjust path as necessary
import { isAdmin, isLoggedIn } from '~/globals/middlewares/auth.middleware'
import { validateBodySchema, validateParamSchema } from '~/globals/middlewares/validate.middleware'
import { createCouponSchema, } from '../schemas/coupons.schema'

const couponsRouter = express.Router()
couponsRouter.use(isLoggedIn , isAdmin)

couponsRouter.get('/', couponsController.getAll)
couponsRouter.post('/',validateBodySchema(createCouponSchema), couponsController.create)
couponsRouter.delete('/:id', couponsController.delete)

export default couponsRouter
