
import { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import { HTTP_STATUS } from "~/globals/constants/http";
import { prisma } from "~/prisma";
import { productsService } from "~/services/db/products.service";
import { generateUniqueString, generateWhere, responseToClient, stringToSlug } from "~/globals/utils/helper";
import { UtilsConstants } from "~/globals/constants/utils.constants";
import { IFilter } from "~/globals/interfaces/global.interface";

class ProductsController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const { page = UtilsConstants.PAGE_DEFAULT, limit = UtilsConstants.LIMIT_DEFAULT ,sortBy = UtilsConstants.SORTBY_DEFAULT , sortDir = UtilsConstants.SORT_DIR_DEFAULT } = req.validatedBody;
        const {filters , searches = []} = req.validatedBody;
        const where = generateWhere(filters ,searches)
        const results = await productsService.read({page , limit , sortBy , sortDir },where);
        return responseToClient(res,results,HTTP_STATUS.CREATED);
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        const {dkp} = req.validatedParams
        const results = await productsService.readOne({dkp});
        return responseToClient(res,results,HTTP_STATUS.CREATED);
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        req.validatedBody.uniqueString = generateUniqueString()
        req.validatedBody.slug = stringToSlug(req.validatedBody.title)
        const results = await productsService.add(req.validatedBody);
        return responseToClient(res,results,HTTP_STATUS.CREATED);
    }
    public async update(req: Request, res: Response, next: NextFunction) {
        req.validatedBody.slug = stringToSlug(req.validatedBody.title)
        const results = await productsService.update(req.validatedBody);
        return responseToClient(res,results,HTTP_STATUS.OK);
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        const results = await productsService.remove(req.validatedParams);
        return responseToClient(res,results,HTTP_STATUS.OK);
    }
}
export const productsController: ProductsController = new ProductsController();
