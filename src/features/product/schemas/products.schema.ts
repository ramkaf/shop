import Joi from 'joi'
const createProductSchema =   Joi.object({
  title: Joi.string().required(),
  longDescription: Joi.string().required(),
  shortDescription: Joi.string().required(),
  quantity: Joi.number().required(),
  categoryId: Joi.number().required(),
  mainImage : Joi.any().optional(),
})
const updateProductSchema = Joi.object({
  dkp: Joi.string().required(),
  title: Joi.string().required(),
  longDescription: Joi.string().required(),
  shortDescription: Joi.string().required(),
  quantity: Joi.number().required(),
  categoryId: Joi.number().required()
})
const getOneProductSchema = Joi.object({
    dkp: Joi.string().required()
  })
const getAllProductsSchema = Joi.object({
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
export { createProductSchema, updateProductSchema, getOneProductSchema, getAllProductsSchema }
