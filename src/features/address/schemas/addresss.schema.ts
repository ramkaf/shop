import Joi from 'joi'

const createAddressSchema = Joi.object({
  country: Joi.string().required(),
  province: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  postalCode: Joi.string().required(),
  unit: Joi.string().required()
})

const updateAddressSchema = Joi.object({
  id: Joi.number().required(),
  country: Joi.string().optional(),
  province: Joi.string().optional(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  unit: Joi.string().optional()
})

const getOneAddressSchema = Joi.object({
  id: Joi.number().required()
})

export { createAddressSchema, updateAddressSchema, getOneAddressSchema }
