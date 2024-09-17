  import Joi from 'joi';

  const createCouponSchema = Joi.object({
    code: Joi.string().alphanum().length(8).optional(),
    type: Joi.string().valid('VALUE', 'PERCENTAGE').required(),
    usedPermittedForEachUser: Joi.number().optional(),
    usedPermittedAll: Joi.number().optional(),
    enable: Joi.boolean().required(),
    discountValue: Joi.number().when('type', {
      is: 'VALUE',
      then: Joi.number().greater(0).required(),
      otherwise: Joi.forbidden(),
    }),
    percentage: Joi.number().when('type', {
      is: 'PERCENTAGE',
      then: Joi.number().min(0).max(100).required(),
      otherwise: Joi.forbidden(),
    }),
    minBuyPrice: Joi.number().when('type', {
      is: 'VALUE',
      then: Joi.number().greater(0).optional(),
      otherwise: Joi.forbidden(),
    }),
    maxDiscount: Joi.number().when('type', {
      is: 'PERCENTAGE',
      then: Joi.number().greater(0).optional(),
      otherwise: Joi.forbidden(),
    }),
    firstOrderOnly: Joi.boolean().optional(),
    user: Joi.number().optional().allow(null),

    expiresIn: Joi.string().valid('30m', '1d', '1M', '1y').optional(),
    expiresAt: Joi.date().greater('now').optional(),
  }).xor('expiresIn', 'expiresAt'); // xor ensures that exactly one field is provided, not both or neither

  export { createCouponSchema };
