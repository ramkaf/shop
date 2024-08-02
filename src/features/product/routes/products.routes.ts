
import express from 'express';
import 'express-async-errors'
import { productsController } from '../controllers/products.controller'; // Adjust path as necessary
import { validateBodySchema, validateParamSchema, validateQuerySchema } from '~/globals/middlewares/validate.middleware';
import { createProductSchema, getAllProductsSchema, getOneProductSchema, updateProductSchema } from '../schemas/products.schema';
import { authMiddleware, isAdmin, isLogged } from '~/globals/middlewares/auth.middleware';
const productsRouter = express.Router();

productsRouter.use(isAdmin)

productsRouter.get('/', validateBodySchema(getAllProductsSchema),productsController.getAll);
productsRouter.get('/:dkp/',validateParamSchema(getOneProductSchema),productsController.getById);
productsRouter.post('/', validateBodySchema(createProductSchema), productsController.create);
productsRouter.put('/',validateBodySchema(updateProductSchema),productsController.update);
productsRouter.delete('/:dkp',validateBodySchema(getOneProductSchema), productsController.delete);   

export default productsRouter;
