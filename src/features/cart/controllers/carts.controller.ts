import { NextFunction, Request, response, Response } from 'express'
import { NotFoundException } from '~/globals/middlewares/error.middleware'
import { responseToClient } from '~/globals/utils/helper'
import { prisma } from '~/prisma'
import { cartsService } from '~/features/cart/services/carts.service'

class CartsController {
  public async createItem(req: Request, res: Response, next: NextFunction) {
    const { variantItemId } = req.validatedBody
    const variantItemDetails = await prisma.variantItem.findUnique({
      where: {
        id: variantItemId // replace with the actual id of the VariantItem
      },
      include: {
        Variant: {
          include: {
            product: true // include the related Product
          }
        }
      }
    })
    if (!variantItemDetails) throw new NotFoundException('the product is not available')
    const { price, quantity } = variantItemDetails!
    if (quantity < 1) throw new NotFoundException('the product is sold out')
    const { id: userId } = req.currentUser
    const addCartItemSchema = { ...req.validatedBody, price, userId }
    const result = await cartsService.addItemQuery(addCartItemSchema)
    return responseToClient(res, result)
  }
  public async deleteItem(req: Request, res: Response, next: NextFunction) {
    const { variantItemId } = req.validatedBody
    const variantItemDetails = await prisma.variantItem.findUnique({
      where: {
        id: variantItemId // replace with the actual id of the VariantItem
      },
      include: {
        Variant: {
          include: {
            product: true // include the related Product
          }
        }
      }
    })

    if (!variantItemDetails) throw new NotFoundException('the product is not available')
    const { price } = variantItemDetails!
    const { id: userId } = req.currentUser
    const addCartItemSchema = { ...req.validatedBody, price, userId }
    const result = await cartsService.minesItemQuery(addCartItemSchema)
    return responseToClient(res, result)
  }
}

export const cartsController: CartsController = new CartsController()
