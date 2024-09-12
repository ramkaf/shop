import express from 'express'
import { productVariantsController } from '../controllers/productVariants.controller' // Adjust path as necessary
import { isLoggedIn } from '~/globals/middlewares/auth.middleware'
import { validateBodySchema, validateParamSchema } from './../../../globals/middlewares/validate.middleware'
import { createProductVariantSchema, getOneProductVariantSchema } from '../schemas/productVariants.schema'
import { isAdmin } from './../../../globals/middlewares/auth.middleware'

const productVariantsRouter = express.Router()
productVariantsRouter.use(isLoggedIn)

productVariantsRouter.post(
  '/',
  isAdmin,
  validateBodySchema(createProductVariantSchema),
  productVariantsController.create
)
productVariantsRouter.delete(
  '/:id',
  isAdmin,
  validateParamSchema(getOneProductVariantSchema),
  productVariantsController.delete
)

export default productVariantsRouter
