
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import 'express-async-errors'
import { categoriesService } from "~/services/db/categories.service";
import { generateUniqueString, responseToClient, stringToSlug } from "~/globals/utils/helper";
import { UtilsConstants } from '~/globals/constants/utils.constants';

class CategoriesController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const { page = UtilsConstants.PAGE_DEFAULT, limit = UtilsConstants.LIMIT_DEFAULT ,sortBy = UtilsConstants.SORTBY_DEFAULT , sortDir = UtilsConstants.SORT_DIR_DEFAULT } = req.validatedQueries;
        const results = await categoriesService.read({page , limit , sortBy , sortDir });
        return responseToClient(res , results)
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
            const result = await categoriesService.readOne(req.validatedParams);
            return responseToClient(res,result)  
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        req.validatedBody.slug = stringToSlug(req.validatedBody.title)
        req.validatedBody.uniqueString = generateUniqueString();
        const result = await categoriesService.add(req.validatedBody)
        return responseToClient(res,result , HTTP_STATUS.CREATED)
    }
    public async update(req: Request, res: Response, next: NextFunction) {  
        const result = await categoriesService.update(req.validatedBody);
        return responseToClient(res,result)
    }
    public async delete(req: Request, res: Response, next: NextFunction) {
        const result = await categoriesService.delete(req.validatedParams);
        return responseToClient(res,result)
    }
}

export const categoriesController: CategoriesController = new CategoriesController();
