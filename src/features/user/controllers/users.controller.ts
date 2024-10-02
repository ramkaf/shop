import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { IUserUpdate } from '../interfaces/user.interface'
import { responseToClient } from '~/globals/utils/helper'
import { usersService } from '../services/users.service'
import { addressesService } from '~/features/address/services/Address.service'
import { cartsService } from '~/features/cart/services/carts.service'
class UsersController {

  public async getMe(req: Request, res: Response, next: NextFunction) {
    return req.currentUser
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const userSchema = { ...req.validatedBody, payload: req.currentUser }
    if (req.file) userSchema.path = req.file.path.replace(/\\/g, '/')
    const user = await usersService.edit(userSchema as IUserUpdate)
    return responseToClient(res, user)
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.currentUser!
    const user = await usersService.diActive(id)
    return responseToClient(res, user)
  }

  public async updatePassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.validatedBody
    const { id } = req.currentUser!
    const user = await usersService.updatePassword({ password, id })
    return responseToClient(res, user)
  }
  public async getAllAddresses(req: Request, res: Response, next: NextFunction) {
    const { id } = req.currentUser!
    const addresses = await addressesService.getAddressesOfAUser(id)
    return responseToClient(res, addresses)
  }
  public async cart(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.currentUser
    const cart = await cartsService.getUserCart(userId)
    return responseToClient(res, cart)
  }
}
export const userController: UsersController = new UsersController()
