import Joi, { number } from 'joi'

const createWishListSchema = Joi.object({
  productId: Joi.number().required()
})

const getWishListOfUserSchema = Joi.object({
  userId: Joi.number().required()
})
const deleteWishSchema = Joi.object({
  id: Joi.number().required()
})

export { createWishListSchema, getWishListOfUserSchema, deleteWishSchema }
