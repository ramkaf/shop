import Joi from 'joi'

export const createCouponSchema = Joi.object({
  code: Joi.string().alphanum().length(8).optional(),
  type: Joi.string().valid('VALUE', 'PERCENTAGE').required(),
  usedPermittedForEachUser: Joi.number().optional(),
  usedPermittedAll: Joi.number().optional(),
  enable: Joi.boolean().required(),
  discountValue: Joi.number().when('type', {
    is: 'VALUE',
    then: Joi.number().greater(0).required(),
    otherwise: Joi.forbidden()
  }),
  percentage: Joi.number().when('type', {
    is: 'PERCENTAGE',
    then: Joi.number().min(0).max(100).required(),
    otherwise: Joi.forbidden()
  }),
  minBuyPrice: Joi.number().when('type', {
    is: 'VALUE',
    then: Joi.number().greater(0).optional(),
    otherwise: Joi.forbidden()
  }),
  maxDiscount: Joi.number().when('type', {
    is: 'PERCENTAGE',
    then: Joi.number().greater(0).optional(),
    otherwise: Joi.forbidden()
  }),
  firstOrderOnly: Joi.boolean().optional(),
  userId: Joi.number().optional().allow(null),

  expiresIn: Joi.string().valid('30m', '1d', '1M', '1y').optional(),
  expiresAt: Joi.date().greater('now').optional()
}).xor('expiresIn', 'expiresAt') 

export const getOneCouponSchema = Joi.object({
  code: Joi.string().required()
})

export const couponFiltersSchema = Joi.object({
  code: Joi.string().optional(),
  type: Joi.string().valid('percentage', 'value').optional(),
  minBuyPrice: Joi.number().greater(0).optional(),
  firstOrderOnly: Joi.boolean().optional(),
  expiresBefore: Joi.date().iso().optional(),
  userId: Joi.number().integer().positive().optional(),
  enable: Joi.boolean().optional(),
  creatorId: Joi.number().integer().positive().optional(),
  beginRange: Joi.date().iso().optional(),
  endRange: Joi.date().iso().optional(),
  sortBy: Joi.string().valid('createdAt', 'expiresAt', 'usedQuantity', 'percentage', 'discountValue').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional(),
});