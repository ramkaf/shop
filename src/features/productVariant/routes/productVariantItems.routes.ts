
import express from 'express';
import { validateBodySchema } from '~/globals/middlewares/validate.middleware';
import { IProductVariantCreate } from '~/features/productVariant/interfaces/productVariants.interface';
import { createProductVariantItemSchema, getOneProductVariantItemSchema } from '../schemas/productVariantItems.schema';
import { productVariantItemsController } from '../controllers/productVariantItems.controller';
import { isLoggedIn } from '~/globals/middlewares/auth.middleware';

const productVariantItemsRouter = express.Router();
productVariantItemsRouter.use(isLoggedIn)

productVariantItemsRouter.post('/' , validateBodySchema(createProductVariantItemSchema) , productVariantItemsController.create)
productVariantItemsRouter.delete('/' , validateBodySchema(getOneProductVariantItemSchema) , productVariantItemsController.delete)


export default productVariantItemsRouter;
