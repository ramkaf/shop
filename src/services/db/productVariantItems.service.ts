import { ProductVariantItem } from "@prisma/client";
import { IProductVariantCreate } from "~/features/productVariant/interfaces/productVariants.interface";
import { prisma } from "~/prisma";

class ProductVariantItemsService {
    public async add (productVariantItem: IProductVariantCreate):Promise<ProductVariantItem>{
        const variantItem : ProductVariantItem = await prisma.productVariantItem.create({
            data : productVariantItem
        })
        return variantItem
    }
    public async remove (id : number){
        
    }
}

export const productVariantItemsService: ProductVariantItemsService = new ProductVariantItemsService();
