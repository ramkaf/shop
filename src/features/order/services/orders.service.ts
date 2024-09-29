import { cartsService } from '~/features/cart/services/carts.service'
import { prisma } from '~/prisma'

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

  public async calculateOrderDeliveryCost(address) {
    return 10
  }
}

export const ordersService: OrdersService = new OrdersService()
