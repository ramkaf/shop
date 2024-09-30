import { Address, Cart } from '@prisma/client'
import { cartsService } from '~/features/cart/services/carts.service'
import { prisma } from '~/prisma'
import { IOrderCreate } from './../interfaces/orders.interface';
import { IAddress } from '~/features/address/interfaces/address.interface';

class OrdersService {
  public async getAll(id: number) {
    const userWithOrders = await prisma.user.findFirst({
      where: {
        id
      },
      include: {
        order: true
      }
    })

    return userWithOrders
  }

  public async get(id: number) {
    const order = await prisma.order.findUnique({
      where: {
        id
      }
    })

    return order
  }

  public async remove(id: number) {
    const order = await prisma.order.delete({
      where: {
        id
      }
    })

    return order
  }
  public async create(orderCreate: IOrderCreate) {
    const { cart, ...rest } = orderCreate;
  
    const order = await prisma.order.create({
      data: {
        ...rest, 
        cartPrice: cart.totalPrice, 
        orderItem: {
          create: cart.cartItems.map(item => ({
            variantId: item.variantId,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });
  
    return order;
  }
  
  
  public async calculateOrderShippingParam(address: IAddress): Promise<{ shippingCost: number; shippingDate: Date; deliveringDate: Date }> {
    const shippingCost: number = 10; // Specify the type for shippingCost
    const currentDate: Date = new Date(); // Specify the type for currentDate
    const shippingDate: Date = new Date(currentDate); // Create a new Date object for shippingDate
    shippingDate.setDate(currentDate.getDate() + 1); // Set shippingDate to one day later

    const deliveringDate: Date = new Date(currentDate); // Create a new Date object for deliveringDate
    deliveringDate.setDate(currentDate.getDate() + 5); // Set deliveringDate to five days later

    return { shippingCost, shippingDate, deliveringDate }; // Return the values as an object
}
  public async calculateServicePrice(cart:Cart , address:IAddress){
    const servicePrice = 5;
    return servicePrice;
  }
}

export const ordersService: OrdersService = new OrdersService()
