
import Joi from 'joi';

const createCategorySchema = Joi.object({
    title : Joi.string().required(),
    icon : Joi.string().required(),
});

const getOneCategorySchema = Joi.object({
    dkp : Joi.string().required(),
    slug : Joi.string().optional(),
});

const updateCategorySchema = Joi.object({
    dkp : Joi.string().required(),
    title : Joi.string().required(),
    icon : Joi.string().required(),
});

const getAllCategoriesSchema = Joi.object({
   page : Joi.number().integer().optional(),
   limit : Joi.number().integer().optional(),
   sortBy : Joi.string().optional(),
   sortDir : Joi.string().optional()
});
export { createCategorySchema, updateCategorySchema ,getOneCategorySchema , getAllCategoriesSchema};
