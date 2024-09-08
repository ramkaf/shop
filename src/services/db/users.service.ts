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

  public async getProductOfUser(id : number) {
    const product = await prisma.user.findMany({
      where: {
        id
      },
      include : {
        products : true
      }
    })
    return product
  }
}

export const usersService: UsersService = new UsersService()
