
import { NextFunction, Request, Response } from "express";
import { checkUserPermission, responseToClient } from "~/globals/utils/helper";
import { prisma } from "~/prisma";
import { productsService } from "~/services/db/products.service";
import { IProductVariantCreate } from "../interfaces/productVariants.interface";
import { IPayload } from "~/features/user/interfaces/payload.interface";
import { productVariantItemsService } from "~/services/db/productVariantItems.service";
import { productVariantsService } from "~/services/db/productVariants.service";

class ProductVariantItemsController {
    public async getAll(req: Request, res: Response, next: NextFunction) {}
    public async getById(req: Request, res: Response, next: NextFunction) {}
    public async create(req: Request, res: Response, next: NextFunction) {
        const {variantId} = req.validatedBody;
        await productVariantsService.findById(variantId)
        const productVariantItemSchema : IProductVariantCreate = {...req.validatedBody}
        const result = await productVariantItemsService.add(productVariantItemSchema)
        return responseToClient(res,result , 200 , "product variant item added successfully")
    }
    
    public async update(req: Request, res: Response, next: NextFunction) {}

    public async delete(req: Request, res: Response, next: NextFunction) {
        const productVariantSchema = {...req.validatedParams}
        const productVariant = await productVariantItemsService.remove(productVariantSchema)
        return responseToClient(res,productVariant,200,"variant item deleted successfully")
    }
}

export const productVariantItemsController: ProductVariantItemsController = new ProductVariantItemsController();
