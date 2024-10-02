import { Request, Response, NextFunction } from 'express'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { responseToClient } from '~/globals/utils/helper'
import { jwtService } from '~/features/user/services/jwt.service'
import { passwordService } from '~/features/user/services/password.service'
import { usersService } from './../services/users.service'

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    const { username, email, mobile , password } = req.validatedBody

    if (await usersService.getUser({ mobile })) throw new BadRequestException('mobile number are belong to another user ...')
    if (await usersService.getUser({ email })) throw new BadRequestException('email are already existed...')
    if (await usersService.getUser({ username })) throw new BadRequestException('username are already taken...')
    const  { confirm_password , ...rest } = req.validatedBody
    rest.password = await passwordService.hashPassword(password)
    const user = await usersService.create(rest)
    const accessToken = await jwtService.generateAccessToken(user)
    return responseToClient(res, { user, accessToken })
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.validatedBody
    const user = await usersService.getActiveUser({ email })

    if (!user || !(await passwordService.checkPassword(password, user.password))) {
      throw new BadRequestException('invalid credential')
    }
    const accessToken = await jwtService.generateAccessToken(user)
    return responseToClient(res, { user: user!, accessToken })
  }
}
export const authController: AuthController = new AuthController()
