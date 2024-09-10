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
        const {id} = productVariantSchema
        const productVariant : ProductVariant = await prisma.productVariant.delete({
            where : {
                id
            }
        })
        if (!productVariant)
            throw new BadRequestException('somethings wrong')
        return productVariant
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
