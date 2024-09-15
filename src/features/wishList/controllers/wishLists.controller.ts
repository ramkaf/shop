import { NextFunction, Request, Response } from 'express'
import { responseToClient } from '~/globals/utils/helper'
import { wishListsService } from '../services/wishLists.service'

class WishListsController {
  public async get(req: Request, res: Response, next: NextFunction) {
    const { id } = req.currentUser!
    const wishlist = await wishListsService.read(id)
    return responseToClient(res, wishlist)
  }
  public async wishOfAUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.validatedParams
    const wishlist = await wishListsService.read(userId)
    return responseToClient(res, wishlist)
  }
  // public async getWishListOfAllUser(req: Request, res: Response, next: NextFunction) {}
  public async create(req: Request, res: Response, next: NextFunction) {
    const wishSchema = { userId: req.currentUser!.id, ...req.validatedBody }
    const wish = wishListsService.add(wishSchema)
    return responseToClient(res, wish)
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.currentUser!
    const deleteSchema = { ...req.validatedParams, userId }
    const wish = await wishListsService.delete(deleteSchema)
    return responseToClient(res, wish)
  }
}

export const wishListsController: WishListsController = new WishListsController()
