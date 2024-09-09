import { prisma } from '~/prisma'
import { User } from '@prisma/client'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { IAuthLogin, IAuthRegister } from '~/features/user/interfaces/auth.interface'
import { IPayload } from '~/features/user/interfaces/payload.interface'
import { usersService } from './users.service'
import { jwtService } from './jwt.service'
import { passwordService } from './password.service'
class AuthService {
  public async createUser(body: IAuthRegister): Promise<{ user: User; accessToken: string }> {
    const { email, password, firstName, lastName, avatar, username } = body
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        avatar,
        username
      }
    })
    const payload = { id: newUser.id, firstName, lastName, email, role: newUser.role }
    const accessToken = await jwtService.generateAccessToken(payload)
    return { user: newUser, accessToken } 
  }
  public async loginUser(body: IAuthLogin): Promise<{ user: User; accessToken: string }> {
    const user = await usersService.getUserByEmail(body.email)
    if (!user || !(await passwordService.checkPassword(body.password, user.password))) {
      throw new BadRequestException('invalid credential')
    }
    const { id, firstName, lastName, email, role } = user
    const payload: IPayload = { id, firstName, lastName, email, role }
    const accessToken = await jwtService.generateAccessToken(payload)
    return { user: user!, accessToken } 
  }
  public async isEmailAlreadyExist(email: string): Promise<Boolean> {
    const user = await prisma.user.findFirst({ where: { email } })
    return user != null
  }
  public async isUsernameAlreadyExist(username: string): Promise<Boolean> {
    const user = await prisma.user.findFirst({ where: { username } })
    return user != null
  }
}
export const authService: AuthService = new AuthService()
