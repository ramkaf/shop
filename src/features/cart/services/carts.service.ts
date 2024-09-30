import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'
import { prisma } from '~/prisma'
import { ICart, ICartItem, ICartItemCreate, ICartResponse } from '../interfaces/carts.interface'

class CartsService {
  public async addItemQuery(cartItemAdd: ICartItemCreate) {
    const { variantItemId, price, userId } = cartItemAdd
    const result = await prisma.$transaction(async (prisma) => {
      const cart = await prisma.cart.upsert({
        where: { userId }, // Unique identifier for the cart
        update: {
          totalPrice: {
            increment: price
          }
        },
        create: {
          totalPrice: price,
          userId
        },
        include: {
          cartItems: true
        }
      })
      const item = await prisma.cartItem.upsert({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId: variantItemId
          }
        },
        update: {
          quantity: {
            increment: 1
          }
        },
        create: {
          cartId: cart.id,
          variantId: variantItemId,
          quantity: 1,
          price
        }
      })
      await prisma.variantItem.update({
        where: { id: variantItemId },
        data: { quantity: { decrement: 1 } }
      })
      return { cart, item }
    })
  }
  public async minesItemQuery(cartItemMines: ICartItemCreate) {
    const { variantItemId, price, userId } = cartItemMines

    const result = await prisma.$transaction(async (prisma) => {
      const cart = await prisma.cart.upsert({
        where: { userId },
        update: {},
        create: {
          totalPrice: 0,
          userId
        },
        include: {
          cartItems: true
        }
      })

      const item = cart.cartItems.find((item) => item.variantId === variantItemId)
      if (!item) throw new BadRequestException('Something went wrong')

      await prisma.cart.update({
        where: {
          id: cart.id
        },
        data: {
          totalPrice: {
            decrement: price
          }
        }
      })

      const updatedCartItem = await prisma.cartItem.update({
        where: {
          id: item.id
        },
        data: {
          quantity: {
            decrement: 1
          }
        }
      })

      if (updatedCartItem.quantity === 0) {
        await prisma.cartItem.delete({
          where: {
            id: item.id
          }
        })
      }

      await prisma.variantItem.update({
        where: { id: variantItemId },
        data: { quantity: { decrement: 1 } }
      })

      return { cart, item }
    })

    return result
  }

  public async getUserCart(userId: number){
    const cart = await prisma.cart.findFirst({
      where: {
        userId
      },
      include: {
        cartItems: {
          include: {}
        }
      }
    })
    let totalPrice = 0.0
    cart?.cartItems.forEach((cartItem) => {
      totalPrice += cartItem.quantity * cartItem.price
    })
    return { cart, totalPrice }
  }
}

export const cartsService: CartsService = new CartsService()
