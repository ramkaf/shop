import express from 'express'
import { isAdmin, isLoggedIn } from '~/globals/middlewares/auth.middleware'
import { validateBodySchema, validateParamSchema } from '~/globals/middlewares/validate.middleware'
import { createVariantItemSchema, createVariantSchema, getOneVariantItemSchema, getOneVariantSchema } from '../schemas/Variants.schema'
import { variantsController } from '../controllers/variants.controller'


const variantsRouter = express.Router()
variantsRouter.use(isLoggedIn)

variantsRouter.post(
  '/',
  isAdmin,
  validateBodySchema(createVariantSchema),
  variantsController.create
)
variantsRouter.delete(
  '/:id',
  isAdmin,
  validateParamSchema(getOneVariantSchema),
  variantsController.delete
)
variantsRouter.post(
  '/item',
  validateBodySchema(createVariantItemSchema),
  variantsController.createItem
)
variantsRouter.delete(
  '/item/:id',
  validateParamSchema(getOneVariantItemSchema),
  variantsController.deleteItem
)

export default variantsRouter
