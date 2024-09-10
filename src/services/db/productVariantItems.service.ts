import { ProductVariantItem } from "@prisma/client";
import { IProductVariantItemCreate, IProductVariantItemGetOne } from "~/features/productVariant/interfaces/productVariantItems.interface";
import { BadRequestException } from "~/globals/middlewares/error.middleware";
import { prisma } from "~/prisma";

class ProductVariantItemsService {
    public async add (productVariantItem: IProductVariantItemCreate):Promise<ProductVariantItem>{
        const variantItem : ProductVariantItem = await prisma.productVariantItem.create({
            data : productVariantItem
        })
        return variantItem
    }
    public async remove (productVariantItemSchema:IProductVariantItemGetOne){
        try {
            const productVariantItem : ProductVariantItem = await prisma.productVariantItem.delete({
                where : productVariantItemSchema
            })
            return productVariantItem
          } catch (error) {
            throw new BadRequestException('no variant item belongs to this id')
          }
    }
}

export const productVariantItemsService: ProductVariantItemsService = new ProductVariantItemsService();
