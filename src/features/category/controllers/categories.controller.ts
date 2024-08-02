
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import 'express-async-errors'
import { categoriesService } from "~/services/db/categories.service";
import { generateUniqueString, responseToClient, stringToSlug ,generateWhere} from "~/globals/utils/helper";
import { UtilsConstants } from '~/globals/constants/utils.constants';
import { Category } from "@prisma/client";
import { ICategoryCreate, ICategoryGetOne } from "../interfaces/categories.interface";
import { BadRequestException } from "~/globals/middlewares/error.middleware";

class CategoriesController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const { page = UtilsConstants.PAGE_DEFAULT, limit = UtilsConstants.LIMIT_DEFAULT ,sortBy = UtilsConstants.SORTBY_DEFAULT , sortDir = UtilsConstants.SORT_DIR_DEFAULT } = req.validatedBody;
        const {filters , searches = []} = req.validatedBody;
        const where = generateWhere(filters ,searches)
        const results = await categoriesService.read({page , limit , sortBy , sortDir },where);
        return responseToClient(res,results,HTTP_STATUS.CREATED);
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        if (!Array.isArray(req.validatedParams)){
            const results = await categoriesService.readOne(req.validatedParams);    
            return responseToClient(res,results) 
        }
        throw new BadRequestException ("فقط یک ای دی به صورت ابجت ارسال کنید")
        
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        let results = []
        if (!Array.isArray(req.validatedBody)){
            req.validatedBody.slug = stringToSlug(req.validatedBody.title)
            req.validatedBody.uniqueString = generateUniqueString();
            results.push(await categoriesService.add(req.validatedBody)) 
            return responseToClient(res,results , HTTP_STATUS.CREATED)
        }
        results = await Promise.all(req.validatedBody.map(async (item) => {
            item.slug = stringToSlug(item.title);
            item.uniqueString = generateUniqueString();
            console.log(item);
            return await categoriesService.add(item);
        }));
        return responseToClient(res, results, HTTP_STATUS.CREATED);
    }
    public async update(req: Request, res: Response, next: NextFunction) {  
        let results = []
        if (!Array.isArray(req.validatedBody)){
            req.validatedBody.slug = stringToSlug(req.validatedBody.title)
            results.push(await categoriesService.update(req.validatedBody)) 
            return responseToClient(res,results)
        }
        results = await Promise.all(req.validatedBody.map(async (item:any) => {
            item.slug = stringToSlug(item.title);
            return await categoriesService.update(item);
        }));
        return responseToClient(res, results);
    }


    public async delete(req: Request, res: Response, next: NextFunction) {
        let results = []
        if (!Array.isArray(req.validatedBody)){
            results.push(await categoriesService.delete(req.validatedParams));
            return responseToClient(res,results)
        }
        results = await Promise.all(req.validatedBody.map(async (item:ICategoryGetOne) => {
            return await categoriesService.delete(item);
        }));
        return responseToClient(res, results);
    }
}

export const categoriesController: CategoriesController = new CategoriesController();
