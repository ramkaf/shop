
import express from 'express';
import { productVariantsController } from '../controllers/productVariants.controller'; // Adjust path as necessary
import { isLoggedIn } from '~/globals/middlewares/auth.middleware';
import { validateBodySchema, validateParamSchema } from './../../../globals/middlewares/validate.middleware';
import { createProductVariantSchema, getOneProductVariantSchema } from '../schemas/productVariants.schema';

const productVariantsRouter = express.Router();
productVariantsRouter.use(isLoggedIn)

productVariantsRouter.get('/', productVariantsController.getAll);
productVariantsRouter.get('/:id', productVariantsController.getById);
productVariantsRouter.post('/', validateBodySchema(createProductVariantSchema),productVariantsController.create);
productVariantsRouter.put('/:id', productVariantsController.update);
productVariantsRouter.delete('/:id/:productId', validateParamSchema(getOneProductVariantSchema),productVariantsController.delete);

export default productVariantsRouter;
