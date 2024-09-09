import express from 'express'
import 'express-async-errors'
import { categoriesController } from '../controllers/categories.controller' 
import {
  validateBodySchema,
  validateParamSchema,
  validateQuerySchema
} from './../../../globals/middlewares/validate.middleware'
import {
  createCategorySchema,
  getOneCategorySchema,
  updateCategorySchema,
  getAllCategoriesSchema
} from '../schemas/categories.schema'
import { isAdmin } from '~/globals/middlewares/auth.middleware'
const categoriesRouter = express.Router()
categoriesRouter.use(isAdmin)
categoriesRouter.get('/', validateBodySchema(getAllCategoriesSchema), categoriesController.getAll)
categoriesRouter.get('/:dkp', validateParamSchema(getOneCategorySchema), categoriesController.getById)
categoriesRouter.post('/', validateBodySchema(createCategorySchema), categoriesController.create)
categoriesRouter.put('/', validateBodySchema(updateCategorySchema), categoriesController.update)
categoriesRouter.delete('/', validateBodySchema(getOneCategorySchema), categoriesController.delete)
export default categoriesRouter
