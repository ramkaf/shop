import express from 'express'
import { validateBodySchema, validateParamSchema } from '~/globals/middlewares/validate.middleware'
import { createProductVariantItemSchema, getOneProductVariantItemSchema } from '../schemas/productVariantItems.schema'
import { productVariantItemsController } from '../controllers/productVariantItems.controller'
import { isAdmin } from './../../../globals/middlewares/auth.middleware'

const productVariantItemsRouter = express.Router()
productVariantItemsRouter.use(isAdmin)

productVariantItemsRouter.post(
  '/',
  validateBodySchema(createProductVariantItemSchema),
  productVariantItemsController.create
)
productVariantItemsRouter.delete(
  '/:id',
  validateParamSchema(getOneProductVariantItemSchema),
  productVariantItemsController.delete
)

export default productVariantItemsRouter
