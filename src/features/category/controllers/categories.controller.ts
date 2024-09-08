import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '~/globals/constants/http'
import 'express-async-errors'
import { categoriesService } from '~/services/db/categories.service'
import { generateUniqueString, responseToClient, stringToSlug, generateWhereCategory } from '~/globals/utils/helper'
import { UtilsConstants } from '~/globals/constants/utils.constants'
import { Category } from '@prisma/client'
import { ICategoryCreate, ICategoryGetOne } from '../interfaces/categories.interface'
import { BadRequestException } from '~/globals/middlewares/error.middleware'

class CategoriesController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const {
      page = UtilsConstants.PAGE_DEFAULT,
      limit = UtilsConstants.LIMIT_DEFAULT,
      sortBy = UtilsConstants.SORTBY_DEFAULT,
      sortDir = UtilsConstants.SORT_DIR_DEFAULT
    } = req.validatedBody
    const { filters, searches = [] } = req.validatedBody
    const where = generateWhereCategory(filters, searches)
    const results = await categoriesService.read({ page, limit, sortBy, sortDir }, where)
    return responseToClient(res, results, HTTP_STATUS.CREATED)
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    if (!Array.isArray(req.validatedParams)) {
      const results = await categoriesService.readOne(req.validatedParams)
      return responseToClient(res, results)
    }
    throw new BadRequestException('فقط یک ای دی به صورت ابجت ارسال کنید')
  }
  public async create(req: Request, res: Response, next: NextFunction) {
      req.validatedBody.slug = stringToSlug(req.validatedBody.title)
      req.validatedBody.uniqueString = generateUniqueString()
      req.validatedBody.currentUser = req.currentUser
      let result = await categoriesService.add(req.validatedBody)
      return responseToClient(res, result, HTTP_STATUS.CREATED)
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    console.log(req.currentUser);
    
      req.validatedBody.slug = stringToSlug(req.validatedBody.title)
      let results =  await categoriesService.update(req.validatedBody)
      return responseToClient(res, results)
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
      let result = await categoriesService.delete(req.validatedParams)
      return responseToClient(res, result)
  }
}

export const categoriesController: CategoriesController = new CategoriesController()
