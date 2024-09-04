import { User } from '@prisma/client'
import { prisma } from '~/prisma'

class UsersService {
  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    return user
  }

  public async getMe(authorization: string | undefined) {}
}

export const usersService: UsersService = new UsersService()
