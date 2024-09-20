import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { ordersService } from '../services/orders.service';
import { RandomStringUtil, responseToClient } from '~/globals/utils/helper';
import { cartsService } from '~/features/cart/services/carts.service';

class OrdersController {
  public async getAllOrder(req: Request, res: Response, next: NextFunction) {
    const {id} = req.currentUser;
    const orders = await ordersService.getAll(id)
    return responseToClient(res,orders)
  }
  public async get(req: Request, res: Response, next: NextFunction) {
    const {uniqueString} = req.validatedParams;
    const orders = await ordersService.get(uniqueString)
    return responseToClient(res,orders)
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    const {id:userId} = req.currentUser;
    const {cart , totalPrice} = await cartsService.getUserCart(userId)
    const {addressId , couponId , recipientNumber , recipientLastName} = req.validatedBody
    const uniqueString = RandomStringUtil.generateRandomString(10, 'alpha')
    
  }
}

export const ordersController: OrdersController = new OrdersController()
