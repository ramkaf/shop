import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { RandomStringUtil, responseToClient } from '~/globals/utils/helper'
import { cartsService } from '~/features/cart/services/carts.service'
import couponsService from '~/features/coupon/services/coupons.service'
import { addressesService } from '~/features/address/services/Address.service'
import { HTTP_STATUS } from './../../../globals/constants/http';
import { ordersService } from './../services/orders.service';
import { IOrderCreate } from '../interfaces/orders.interface'
import { ICoupon } from '~/features/coupon/interfaces/coupons.interface'

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
    const { id: userId } = req.currentUser;
    let { addressId, couponCode: code, recipientNumber, recipientLastName, recipientName } = req.validatedBody;
  
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    if (!recipientLastName || !recipientName || !recipientNumber) {
      recipientName = user.firstName;
      recipientLastName = user.lastName;
      recipientNumber = user.mobile;
    }
  
    const { cart } = await cartsService.getUserCart(userId);
  
    if (!cart) return responseToClient(res, [], HTTP_STATUS.BAD_REQUEST, 'no cart');
    if (!cart?.cartItems) return responseToClient(res, [], HTTP_STATUS.BAD_REQUEST, 'no item in cart');
  
    const address = await addressesService.get(addressId);
    if (!address) return responseToClient(res, [], HTTP_STATUS.BAD_REQUEST, 'address is required');
    const uniqueString = RandomStringUtil.generateRandomString(10, 'alpha');
  
    let finalDiscount = 0,
    couponId = null,
      finalStatus; // Initialize discount with a default value of 0
  
    if (code) {
      const couponApplySchema = { code, cart, userId };
      const { discount, status, coupon } = await couponsService.apply(couponApplySchema);
      finalDiscount = discount;
      finalStatus = status;
      couponId = coupon!.id;
    }
  
    const { shippingCost, deliveringDate } = await ordersService.calculateOrderShippingParam(address);
    const servicePrice = await ordersService.calculateServicePrice(cart, address);
    const finalPrice = cart.totalPrice + shippingCost + servicePrice;
    const shippingDate = new Date();
  
    // Constructing the orderSchema based on IOrderCreate interface
    const orderSchema: IOrderCreate= {
      uniqueString,
      discount: finalDiscount,
      userId,
      cart,
      recipientLastName,
      recipientName,
      recipientNumber,
      shippingDate,
      shippingCost,
      servicePrice,
      finalPrice,
      addressId,
      couponId
    };
  
    const order = await ordersService.create(orderSchema);
    return order
  }
  
}

export const ordersController: OrdersController = new OrdersController()
