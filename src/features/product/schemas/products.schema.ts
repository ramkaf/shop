
import Joi from 'joi';

const createProductSchema = Joi.alternatives().try(
    Joi.object({
        title : Joi.string().required(),
        longDescription:Joi.string().required(),
        shortDescription:Joi.string().required(),
        quantity:Joi.number().required(),
        mainImage: Joi.string().required(),
        categoryId : Joi.number().required(),
        userId : Joi.number().required()
    }),
    Joi.array().items(Joi.object({
        title : Joi.string().required(),
        longDescription:Joi.string().required(),
        shortDescription:Joi.string().required(),
        quantity:Joi.number().required(),
        mainImage: Joi.string().required(),
        categoryId : Joi.number().required(),
        userId : Joi.number().required()
    }))
);
const updateProductSchema = Joi.alternatives().try(
    Joi.object({
        dkp: Joi.string().required(),
        title : Joi.string().required(),
        longDescription:Joi.string().required(),
        shortDescription:Joi.string().required(),
        quantity:Joi.number().required(),
        mainImage: Joi.string().required(),
        categoryId : Joi.number().required()
    }),
    Joi.array().items(Joi.object({
        dkp: Joi.string().required(),
        title : Joi.string().required(),
        longDescription:Joi.string().required(),
        shortDescription:Joi.string().required(),
        quantity:Joi.number().required(),
        mainImage: Joi.string().required(),
        categoryId : Joi.number().required()
    }))
);
const getOneProductSchema = Joi.alternatives().try(
    Joi.object({
        dkp : Joi.string().required(),
    }),
    Joi.array().items(Joi.object({
        dkp : Joi.string().required(),
    }))
);
const getAllProductsSchema = Joi.object({
    page: Joi.number().integer().optional(),
    limit: Joi.number().integer().optional(),
    sortBy: Joi.string().optional(),
    sortDir: Joi.string().optional(),
    filters: Joi.array().items(
        Joi.object({
            field: Joi.string().required(),
            condition: Joi.string().valid('equals','not' , 'in' , 'notIn' , 'lt' , 'lte' , 'gt' , 'gte' , 'contains' , 'startsWith' , 'endsWith').required(),
            value: Joi.alternatives().try(Joi.number(), Joi.string()).required()
        })
    ).optional(),
    searches: Joi.array().items(
        Joi.object({
            fields: Joi.array().items(Joi.string()).required(),
            value: Joi.string().required()
        })
    ).optional()
});

export { createProductSchema, updateProductSchema ,getOneProductSchema , getAllProductsSchema};

