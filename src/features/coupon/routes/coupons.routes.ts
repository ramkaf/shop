import express from 'express'
import { couponsController } from '../controllers/coupons.controller' // Adjust path as necessary
import { isAdmin, isLoggedIn } from '~/globals/middlewares/auth.middleware'
import { validateBodySchema, validateParamSchema } from '~/globals/middlewares/validate.middleware'
import { couponFiltersSchema, createCouponSchema, getOneCouponSchema, updateCouponSchema } from '../schemas/coupons.schema'

const couponsRouter = express.Router()
couponsRouter.use(isLoggedIn, isAdmin)

couponsRouter.get('/',validateBodySchema(couponFiltersSchema), couponsController.getAll)
couponsRouter.post('/', validateBodySchema(createCouponSchema), couponsController.create)
couponsRouter.put('/', validateBodySchema(updateCouponSchema), couponsController.update)
couponsRouter.delete('/:code', validateParamSchema(getOneCouponSchema), couponsController.delete)

export default couponsRouter
