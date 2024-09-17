import Joi from 'joi'

const cartItemSchema = Joi.object({
  variantItemId: Joi.number().required()
})

export { cartItemSchema }
