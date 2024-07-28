import exp from 'constants'
import express from 'express'
import { validateSchema } from '~/globals/middlewares/validate.middleware'
import usersRegisterSchema from '../schema/users.register.schema'
import usersLoginSchema from '../schema/users.login.schema'
import { asyncWrapper } from './../../../globals/middlewares/error.middleware';
import { authController } from '../controller/auth.controller'

const authRoute = express.Router()

authRoute.post('/register' ,validateSchema(usersRegisterSchema),asyncWrapper(authController.register))
authRoute.post('/login' ,validateSchema(usersLoginSchema),asyncWrapper(authController.login))

export default authRoute;