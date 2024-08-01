
import Joi from 'joi';

const createProductSchema = Joi.object({
    title : Joi.string().required(),
    longDescription:Joi.string().required(),
    shortDescription:Joi.string().required(),
    quantity:Joi.number().required(),
    mainImage: Joi.string().required(),
    categoryId : Joi.number().required()
});
const getOneProductSchema = Joi.object({
    dkp : Joi.string().required(),
});
const getAllProductsSchema = Joi.object({
    page: Joi.number().integer().optional(),
    limit : Joi.number().integer().optional(),
    sortBy : Joi.string().optional(),
    sortDir : Joi.string().optional()
});
const updateProductSchema = Joi.object({
    dkp: Joi.string().required(),
    title : Joi.string().required(),
    longDescription:Joi.string().required(),
    shortDescription:Joi.string().required(),
    quantity:Joi.number().required(),
    mainImage: Joi.string().required(),
    categoryId : Joi.number().required()
});

export { createProductSchema, updateProductSchema ,getOneProductSchema , getAllProductsSchema};
