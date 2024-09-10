
import { NextFunction, Request, Response } from "express";
import { prisma } from "~/prisma";
import { productVariantsService } from "~/services/db/productVariants.service";
import { IProductVariantCreate } from "../interfaces/productVariants.interface";
import { checkUserPermission, responseToClient } from "~/globals/utils/helper";
import { productsService } from "~/services/db/products.service";
import { IPayload } from "~/features/user/interfaces/payload.interface";

class ProductVariantsController {
    public async getAll(req: Request, res: Response, next: NextFunction) {}
    public async getById(req: Request, res: Response, next: NextFunction) {}
    public async create(req: Request, res: Response, next: NextFunction) {
        const {productId} = req.validatedBody
        const product = await productsService.findById(productId)
        const payload = req.currentUser as IPayload
        checkUserPermission(product , payload)
        const productVariantSchema : IProductVariantCreate = {...req.validatedBody}
        const result = await productVariantsService.add(productVariantSchema)
        return responseToClient(res,result , 200 , "product variant added successfully")
    }

    public async update(req: Request, res: Response, next: NextFunction) {}
    public async delete(req: Request, res: Response, next: NextFunction) {
        const payload = req.currentUser as IPayload
        if (payload.role !== 'ADMIN'){
            const {productId} = req.validatedBody
            const product = await productsService.findById(productId)
            checkUserPermission(product , payload)
        }
        const productVariantSchema = {...req.validatedBody}
        const productVariant = await productVariantsService.remove(productVariantSchema)
        return responseToClient(res,productVariant,200,"variant deleted successfully")
    }
}

export const productVariantsController: ProductVariantsController = new ProductVariantsController();
