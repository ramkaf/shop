import Joi, { number, string } from 'joi'

const createProductVariantSchema = Joi.object({
  name: Joi.string().required(),
  productId: Joi.number().required()
})

const getOneProductVariantSchema = Joi.object({
  id: Joi.number().required()
})

export { createProductVariantSchema, getOneProductVariantSchema }
