import { NextFunction, Request, Response } from 'express'
import { productsService } from '~/features/product/services/products.service'
import { IVariantCreate, IVariantItemCreate } from '../interfaces/variants.interface'
import { variantsService } from '../services/variants.service'
import { responseToClient } from '~/globals/utils/helper'

class VariantsController {
  public async create(req: Request, res: Response, next: NextFunction) {
    
    const { productId } = req.validatedBody
    await productsService.findById(productId)
    const variantSchema: IVariantCreate = { ...req.validatedBody }
    const result = await variantsService.add(variantSchema)
    return responseToClient(res, result, 200, 'product variant added successfully')
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const variantSchema = { ...req.validatedParams }
    const variant = await variantsService.remove(variantSchema)
    return responseToClient(res, variant, 200, 'variant deleted successfully')
  }
  
  public async createItem(req: Request, res: Response, next: NextFunction) {
    const { variantId } = req.validatedBody
    await variantsService.findById(variantId)
    const variantItemSchema: IVariantItemCreate= { ...req.validatedBody }
    const result = await variantsService.addItem(variantItemSchema)
    return responseToClient(res, result, 200, 'product variant item added successfully')
  }
  public async deleteItem(req: Request, res: Response, next: NextFunction) {
    const variantSchema = { ...req.validatedParams }
    const variant = await variantsService.removeItem(variantSchema)
    return responseToClient(res, variant, 200, 'variant item deleted successfully')
  }
}

export const variantsController: VariantsController = new VariantsController()
