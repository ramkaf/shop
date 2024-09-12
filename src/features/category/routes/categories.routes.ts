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
import { upload } from './../../../globals/utils/multer'
const categoriesRouter = express.Router()

const uploadImage = upload('category')

categoriesRouter.get('/', validateBodySchema(getAllCategoriesSchema), categoriesController.getAll)
categoriesRouter.get('/:dkp', validateParamSchema(getOneCategorySchema), categoriesController.getById)
categoriesRouter.post(
  '/',
  isAdmin,
  uploadImage.single('mainImage'),
  validateBodySchema(createCategorySchema),
  categoriesController.create
)
categoriesRouter.put('/', isAdmin, validateBodySchema(updateCategorySchema), categoriesController.update)
categoriesRouter.delete('/', isAdmin, validateBodySchema(getOneCategorySchema), categoriesController.delete)

export default categoriesRouter
