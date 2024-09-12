import { Request, Response, NextFunction } from 'express'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { responseToClient } from '~/globals/utils/helper'
import { jwtService } from '~/services/db/jwt.service'
import { passwordService } from '~/services/db/password.service'
import { usersService } from '~/services/db/users.service'


export class AuthController {

  public async register(req: Request, res: Response, next: NextFunction) {
    const {username , email , password } = req.validatedBody
    if (await usersService.getUser({email})) 
      throw new BadRequestException('email are already existed ...')
    if (await usersService.getUser({username}))
      throw new BadRequestException('username are already taken...')
    const authSchema = {...req.validatedBody}
    authSchema.password = await passwordService.hashPassword(password)
    const user = await usersService.create(authSchema)
    const accessToken = await jwtService.generateAccessToken(user)
    return responseToClient(res,{user , accessToken})
  }


  public async login(req: Request, res: Response, next: NextFunction) {
      const {email , password} = req.validatedBody
      const user = await usersService.getActiveUser({email})
      
      if (!user || !(await passwordService.checkPassword(password , user.password))) {
        throw new BadRequestException('invalid credential')
      }
      const accessToken = await jwtService.generateAccessToken(user)
      return responseToClient(res,{ user: user!, accessToken })
  }


}
export const authController: AuthController = new AuthController()
