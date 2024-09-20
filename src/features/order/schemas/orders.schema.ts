import Joi from 'joi'

const createOrderSchema = Joi.object({
    
    addressId: Joi.number().integer().required().messages({
      'number.base': 'Address ID must be a number.',
      'number.integer': 'Address ID must be an integer.',
      'any.required': 'Address ID is required.',
    }),
    couponId: Joi.number().integer().allow(null).messages({
      'number.base': 'Coupon ID must be a number.',
      'number.integer': 'Coupon ID must be an integer.',
    }),
    recipientNumber: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        'string.base': 'Recipient Number must be a string.',
        'string.pattern.base': 'Recipient Number must be between 10 and 15 digits.',
        'any.required': 'Recipient Number is required.',
      }),
    recipientLastName: Joi.string().min(1).required().messages({
      'string.base': 'Recipient Last Name must be a string.',
      'string.min': 'Recipient Last Name must have at least 1 character.',
      'any.required': 'Recipient Last Name is required.',
    }),
  });

export { createOrderSchema }
