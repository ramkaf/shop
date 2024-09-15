import { BadRequestException, NotFoundException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";
import { ICartItem } from './../../features/cart/interfaces/carts.interface';

class CartsService {
    public async addItemQuery(cartItemAdd : ICartItem){
      const {variantItemId , price , userId} = cartItemAdd
        const cart = await prisma.cart.upsert({
            where: { userId }, // Unique identifier for the cart
            update: {
                totalPrice : {
                    increment : price
                }
            },
            create: {
              totalPrice: 0,
              userId,
            },
            include : {
                cartItems : true
            }
          });
          const item = await prisma.cartItem.upsert({
            where: {
              cartId_variantId: {  // Use the composite unique key for the `where` clause
                cartId: cart.id,
                variantId: variantItemId
              }
            },
            update: {
                quantity : {
                    increment : 1
                }
            },
            create: {
              cartId: cart.id,
              variantId: variantItemId,
              quantity : 1 ,
              price
            }
          });
          // console.log({item});
          
          await prisma.variantItem.update({
            where: { id: variantItemId },
            data: { quantity: { decrement: 1 } },
          });
          return {cart , item}
        }
   public async minesItemQuery (cartItemMines : ICartItem){
    const {variantItemId , price , userId} = cartItemMines
    const cart = await prisma.cart.upsert({
      where: { userId  }, // Unique identifier for the cart
      update: {},
      create: {
        totalPrice: 0,
        userId,
      },
      include : {
          cartItems : true
      }
    });
    const item = cart.cartItems.find(item=>item.variantId === variantItemId)
    if (!item)
      throw new BadRequestException("something wrong")

    await prisma.cart.update({
      where : {
        id : cart.id
      },
      data :{
        totalPrice : {
          decrement : price
        }
      }
    })
    const updatedCartItem = await prisma.cartItem.update({
      where: {
        id: item.id,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    if (updatedCartItem.quantity === 0)
      await prisma.cartItem.delete({
        where : {
          id : item.id
        }
      })
    await prisma.variantItem.update({
      where: { id: variantItemId },
      data: { quantity: { decrement: 1 } },
    });
    return {cart , item}
   }     
}

export const cartsService: CartsService = new CartsService();
