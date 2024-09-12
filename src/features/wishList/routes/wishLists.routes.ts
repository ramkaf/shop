
import express from 'express';
import { wishListsController } from '../controllers/wishLists.controller'; // Adjust path as necessary
import { validateBodySchema, validateParamSchema } from './../../../globals/middlewares/validate.middleware';
import { createWishListSchema, deleteWishSchema, getWishListOfUserSchema } from '../schemas/wishLists.schema';
import { isLoggedIn } from '~/globals/middlewares/auth.middleware';
import { isAdmin } from './../../../globals/middlewares/auth.middleware';

const wishListsRouter = express.Router();
wishListsRouter.use(isLoggedIn)

wishListsRouter.get('/', wishListsController.get);
wishListsRouter.get('/:userId',isAdmin , validateParamSchema(getWishListOfUserSchema), wishListsController.wishOfAUser);
wishListsRouter.post('/', validateBodySchema(createWishListSchema) , wishListsController.create);
wishListsRouter.delete('/:id', validateParamSchema(deleteWishSchema) ,  wishListsController.delete);

export default wishListsRouter;
