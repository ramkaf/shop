import { ProductVariant } from '@prisma/client';
import { prisma } from './../../prisma';
import { IProductVariantCreate, IProductVariantGetOne } from '~/features/productVariant/interfaces/productVariants.interface';
import { BadRequestException } from '~/globals/middlewares/error.middleware';

class ProductVariantsService {
    public async add (productVariantSchema:IProductVariantCreate):Promise<ProductVariant>{
        const {name , productId} =productVariantSchema  
        const productVariant : ProductVariant = await prisma.productVariant.create({
            data : {
                name,
                productId
            }
        })
        return productVariant
    }
    public async remove (productVariantSchema:IProductVariantGetOne):Promise<ProductVariant>{
      try {
        const productVariant : ProductVariant = await prisma.productVariant.delete({
            where : productVariantSchema
        })
        return productVariant
      } catch (error) {
        throw new BadRequestException('no variant belongs to this id')
      }
    }
    public async findById(id : number){
        const variant = await prisma.productVariant.findFirst({
            where : {
                id
            }
        })
        if (!variant)
            throw new BadRequestException('no variant belongs to this id')
        return variant;
    }
}

export const productVariantsService: ProductVariantsService = new ProductVariantsService();
