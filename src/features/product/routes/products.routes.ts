import express from 'express'
import 'express-async-errors'
import { productsController } from '../controllers/products.controller' 
import { validateBodySchema, validateParamSchema, validateQuerySchema } from '~/globals/middlewares/validate.middleware'
import {
  createProductSchema,
  getAllProductsSchema,
  getOneProductSchema,
  updateProductSchema
} from '../schemas/products.schema'
import { upload } from './../../../globals/utils/multer';
const productsRouter = express.Router()
const uploadImage = upload('products');
productsRouter.get('/', validateBodySchema(getAllProductsSchema), productsController.getAll)
productsRouter.get('/:dkp/', validateParamSchema(getOneProductSchema), productsController.getById)
productsRouter.post('/' ,uploadImage.single("mainImage"), validateBodySchema(createProductSchema), productsController.create)
productsRouter.put('/', validateBodySchema(updateProductSchema), productsController.update) 
productsRouter.delete('/:dkp', validateBodySchema(getOneProductSchema), productsController.delete)
export default productsRouter
