import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { usersService } from '~/services/db/users.service';
import {IUserUpdate } from '../interfaces/user.interface';
import { responseToClient } from '~/globals/utils/helper';
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

  public async update(req:Request , res:Response , next:NextFunction){
    const userSchema = {...req.validatedBody , payload:req.currentUser}
    if (req.file)
      userSchema.path = req.file.path.replace(/\\/g, '/')
    const user = await usersService.edit(userSchema as IUserUpdate)
    return responseToClient(res , user)
  }
  public async delete(req:Request , res:Response , next:NextFunction){
    const {id} = req.currentUser!
    const user = await usersService.diActive(id)
    return responseToClient(res , user)
  }

  public async updatePassword(req:Request , res:Response , next:NextFunction){
    const {password} = req.validatedBody
    const {id} = req.currentUser!
    const user = await usersService.updatePassword({password , id})
    return responseToClient(res , user)
  }

}
export const userController: UsersController = new UsersController()
