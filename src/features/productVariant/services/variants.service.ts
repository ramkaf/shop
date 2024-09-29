import { Variant, VariantItem } from '@prisma/client'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import {
  IVariantCreate,
  IVariantGetOne,
  IVariantItemCreate,
  IVariantItemGetOne
} from '../interfaces/variants.interface'
import { prisma } from '~/prisma'

class VariantsService {
  public async add(variantSchema: IVariantCreate): Promise<Variant | undefined> {
    const variant = await prisma.variant.create({
      data: variantSchema
    })
    return variant
  }

  public async remove(variantSchema: IVariantGetOne): Promise<Variant> {
    try {
      const variant: Variant = await prisma.variant.delete({
        where: variantSchema
      })
      return variant
    } catch (error) {
      throw new BadRequestException('no variant belongs to this id')
    }
  }
  public async findById(id: number) {
    const variant = await prisma.variant.findFirst({
      where: {
        id
      }
    })
    if (!variant) throw new BadRequestException('no variant belongs to this id')
    return variant
  }
  public async addItem(variantItemCreate: IVariantItemCreate): Promise<VariantItem> {
    const variantItem: VariantItem = await prisma.variantItem.create({
      data: variantItemCreate
    })
    return variantItem
  }
  public async removeItem(variantItemSchema: IVariantItemGetOne) {
    try {
      const variantItem: VariantItem = await prisma.variantItem.delete({
        where: variantItemSchema
      })
      return variantItem
    } catch (error) {
      console.log(error)

      throw new BadRequestException('no variant item belongs to this id')
    }
  }
}

export const variantsService: VariantsService = new VariantsService()
