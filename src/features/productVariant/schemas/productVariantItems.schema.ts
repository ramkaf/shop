
import Joi from 'joi';

const createProductVariantItemSchema = Joi.object({
    productId : Joi.number().required(),
    variantId : Joi.number().required(),
    name : Joi.string().required()
});
const getOneProductVariantItemSchema = Joi.object({
    id : Joi.number().required()
});

export { createProductVariantItemSchema , getOneProductVariantItemSchema};
