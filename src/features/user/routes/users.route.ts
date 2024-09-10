import express from 'express'
import 'express-async-errors'
import { userController } from '../controllers/users.controller'
import { authMiddleware, isLoggedIn } from '~/globals/middlewares/auth.middleware'
import 'express-async-errors'
import { upload } from './../../../globals/utils/multer';

const userRoute = express.Router()
userRoute.use(isLoggedIn)
const uploadImage = upload('user')

userRoute.get('/me', isLoggedIn, userController.getMe)
userRoute.post('/avatar',uploadImage.single('avatar'), userController.avatar)

export default userRoute
