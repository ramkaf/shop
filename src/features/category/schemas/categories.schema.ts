import Joi from 'joi'

const createCategorySchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().required()
})

const updateCategorySchema =Joi.object({
  dkp: Joi.string().required(),
  title: Joi.string().required(),
  icon: Joi.string().required()
})

const getOneCategorySchema = Joi.object({
  dkp: Joi.string().required()
})

const getAllCategoriesSchema = Joi.object({
  page: Joi.number().integer().optional(),
  limit: Joi.number().integer().optional(),
  sortBy: Joi.string().optional(),
  sortDir: Joi.string().optional(),
  filters: Joi.array()
    .items(
      Joi.object({
        field: Joi.string().required(),
        condition: Joi.string()
          .valid('equals', 'not', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'contains', 'startsWith', 'endsWith')
          .required(),
        value: Joi.alternatives().try(Joi.number(), Joi.string()).required()
      })
    )
    .optional(),
  searches: Joi.string().optional()
})
export { createCategorySchema, updateCategorySchema, getOneCategorySchema, getAllCategoriesSchema }
