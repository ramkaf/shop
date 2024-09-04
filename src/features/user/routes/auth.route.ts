import express from 'express'
import 'express-async-errors'
import { validateBodySchema } from '~/globals/middlewares/validate.middleware'
import { authController } from '../controllers/auth.controller'
import { usersLoginSchema, usersRegisterSchema } from '../schemas/users.schema'

const authRoute = express.Router()

authRoute.post('/register', validateBodySchema(usersRegisterSchema), authController.register)
authRoute.post('/login', validateBodySchema(usersLoginSchema), authController.login)

export default authRoute
