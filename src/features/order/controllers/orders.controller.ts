import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { ordersService } from '../services/orders.service'
import { RandomStringUtil, responseToClient } from '~/globals/utils/helper'
import { cartsService } from '~/features/cart/services/carts.service'
import couponsService from '~/features/coupon/services/coupons.service'
import { HTTP_STATUS } from '~/globals/constants/http'
import { addressesService } from '~/features/address/services/Address.service'

class OrdersController {
  public async getAllOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.currentUser
    const orders = await ordersService.getAll(id)
    return responseToClient(res, orders)
  }
  public async get(req: Request, res: Response, next: NextFunction) {
    const { uniqueString } = req.validatedParams
    const orders = await ordersService.get(uniqueString)
    return responseToClient(res, orders)
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.currentUser
    const { cart } = await cartsService.getUserCart(userId)

    if (!cart) return responseToClient(res, [], HTTP_STATUS.BAD_REQUEST, 'no cart')
    if (!cart?.cartItems) return responseToClient(res, [], HTTP_STATUS.BAD_REQUEST, 'no item in cart')

    const { addressId, couponCode: code, recipientNumber, recipientLastName } = req.validatedBody
    const address = addressesService.get(addressId)
    const uniqueString = RandomStringUtil.generateRandomString(10, 'alpha')

    let finalDiscount = 0,
      minPriceCoupon,
      finalStatus // Initialize discount with a default value of 0

    if (code) {
      const couponApplySchema = { code, cart, userId }
      const { discount, minPrice, status } = await couponsService.apply(couponApplySchema)
      finalDiscount = discount
      minPriceCoupon = minPrice
      finalStatus = status
    }

    const deliveryCost = ordersService.calculateOrderDeliveryCost(address)
  }
}

export const ordersController: OrdersController = new OrdersController()
