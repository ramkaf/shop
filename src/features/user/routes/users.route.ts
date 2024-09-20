import express from 'express'
import 'express-async-errors'
import { userController } from '../controllers/users.controller'
import { authMiddleware, isLoggedIn } from '~/globals/middlewares/auth.middleware'
import 'express-async-errors'
import { upload } from './../../../globals/utils/multer'
import { validateBodySchema } from '~/globals/middlewares/validate.middleware'
import { usersUpdateSchema, userUpdatePasswordSchema } from '../schemas/users.schema'
import { cartsController } from '~/features/cart/controllers/carts.controller'
const userRoute = express.Router()

userRoute.use(isLoggedIn)
const uploadImage = upload('user')

userRoute.get('/me', userController.getMe)
userRoute.get('/addresses', userController.getAllAddresses)
userRoute.put('/update', uploadImage.single('avatar'), validateBodySchema(usersUpdateSchema), userController.update)
userRoute.put('/update-password', validateBodySchema(userUpdatePasswordSchema), userController.updatePassword)
userRoute.delete('/delete', userController.delete)
userRoute.get('/cart', userController.cart)

export default userRoute
