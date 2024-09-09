import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { usersService } from '~/services/db/users.service'
class UsersController {
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password, avatar, username } = req.body
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        password,
        avatar,
        email,
        username
      }
    })
    res.status(201).json({ newUser })
    console.log('Inserted user:', newUser)
  }
  public async getMe(req: Request, res: Response, next: NextFunction) {
    return req.currentUser
  }
  public async readMyProduct(req: Request, res: Response, next: NextFunction) {
    const {id} = req.currentUser!;
    const products = await usersService.getProductOfUser(id);
    return res.status(200).json({products})
  }
}
export const userController: UsersController = new UsersController()
