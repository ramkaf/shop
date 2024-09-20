import Joi from 'joi'

export const createAddressSchema = Joi.object({
  provinceId: Joi.number().required(),
  cityId: Joi.number().required(),
  address: Joi.string().required(),
  postalCode: Joi.string().required(),
  unit: Joi.string().required()
})

export const updateAddressSchema = Joi.object({
  id: Joi.number().required(),
  country: Joi.string().optional(),
  province: Joi.string().optional(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
  postalCode: Joi.string().optional(),
  unit: Joi.string().optional()
})

export const getOneAddressSchema = Joi.object({
  id: Joi.number().required()
})
export const getCityOfProvinceSchema = Joi.object({
  province_id: Joi.number().required()
})

