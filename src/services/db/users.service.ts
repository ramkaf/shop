import { User } from '@prisma/client'
import { prisma } from '~/prisma'
import { IAvatar } from './../../features/user/interfaces/auth.interface';
class UsersService {
  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    return user
  }
  public async avatar(avatar:IAvatar) {
    const {id} = avatar.payload
    const {path} = avatar
    const result = await prisma.user.update(
    {
      data : {
        avatar :path 
      },
      where : {
        id
      }
    }
    )
    return result;
  }
}
export const usersService: UsersService = new UsersService()
