import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { usersService } from '~/services/db/users.service';
import { IAvatar } from '../interfaces/auth.interface';
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

  public async avatar(req:Request , res:Response , next:NextFunction){
    if (!req.file)
      return res.status(400).send({errorMessages: ["image is required"]})
    const userSchema = {path : req.file.path , payload:req.currentUser}
    const result = await usersService.avatar(userSchema as IAvatar)
  }

}
export const userController: UsersController = new UsersController()
