
import express from 'express'
import { userController } from '../controller/users.controller'
import { authMiddleware , isLogged} from '~/globals/middlewares/auth.middleware'
import 'express-async-errors'
const userRoute = express.Router()

userRoute.get('/me' ,authMiddleware,isLogged ,userController.getMe)

export default userRoute; 