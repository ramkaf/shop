import express from 'express'
import 'express-async-errors'
import { userController } from '../controllers/users.controller'
import { authMiddleware, isLoggedIn } from '~/globals/middlewares/auth.middleware'
import 'express-async-errors'
const userRoute = express.Router()

userRoute.get('/me', authMiddleware, isLoggedIn, userController.getMe)

export default userRoute
