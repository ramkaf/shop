import { User } from '@prisma/client'
import { prisma } from '~/prisma'
import {IAuthRegister, IGetUser, IUpdatePassword, IUserUpdate } from '~/features/user/interfaces/user.interface'
import { BadRequestException, ForbiddenException } from '~/globals/middlewares/error.middleware'
import { passwordService } from './password.service'

class UsersService {
  public async create(authRegister: IAuthRegister) {
    const user = await prisma.user.create({
      data: authRegister
    })
    if (!user) throw new BadRequestException('something wrong')
    return user
  }
  public async getUser(getUser: IGetUser): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: getUser
    })
    return user
  }
  public async edit(userUpdate: IUserUpdate) {
    const { id } = userUpdate.payload
    const { path, firstName, lastName } = userUpdate
    const result = await prisma.user.update({
      data: {
        avatar: path,
        firstName,
        lastName
      },
      where: {
        id
      }
    })
    return result
  }

  public async diActive(id: number) {
    const user = await prisma.user.update({
      data: {
        isActive: false
      },
      where: {
        id
      }
    })
  }
  public async getActiveUser(getUser: IGetUser) {
    const user = await this.getUser(getUser)
    if (!user || (user && user.isActive === false)) throw new ForbiddenException('this account was banned')
    return user
  }
  public async updatePassword(updatePassword: IUpdatePassword) {
    const { id, password } = updatePassword
    const newPassword = await passwordService.hashPassword(password)
    const user = await prisma.user.update({
      data: {
        password: newPassword
      },
      where: {
        id
      }
    })
    return user
  }
}
export const usersService: UsersService = new UsersService()
