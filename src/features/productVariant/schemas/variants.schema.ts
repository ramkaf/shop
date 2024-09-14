import Joi, { number, string } from 'joi'

const createVariantSchema = Joi.object({
  name: Joi.string().required(),
  productId: Joi.number().required()
})

const getOneVariantSchema = Joi.object({
  id: Joi.number().required()
})

const createVariantItemSchema = Joi.object({
  variantId: Joi.number().required(),
  name: Joi.string().required(),
  price : Joi.number().optional(),
  quantity : Joi.number().required()
})
const getOneVariantItemSchema = Joi.object({
  id: Joi.number().required()
})


export { createVariantSchema,createVariantItemSchema , getOneVariantItemSchema, getOneVariantSchema }
