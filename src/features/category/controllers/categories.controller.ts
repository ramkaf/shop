import { NextFunction, Request, Response } from 'express'
import { HTTP_STATUS } from '~/globals/constants/http'
import 'express-async-errors'
import { generateUniqueString, responseToClient, stringToSlug, generateWhereCategory } from '~/globals/utils/helper'
import { UtilsConstants } from '~/globals/constants/utils.constants'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { categoriesService } from '../services/categories.service'
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
    throw new BadRequestException('no category belong to this id')
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    if (!req.file) return res.status(400).send({ errorMessages: ['image is required'] })
    const categorySchema = {
      ...req.body,
      slug: stringToSlug(req.validatedBody.title),
      uniqueString: generateUniqueString(),
      mainImage: req.file.path.replace(/\\/g, '/')
    }
    let result = await categoriesService.add(categorySchema)
    return responseToClient(res, result, HTTP_STATUS.CREATED)
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    req.validatedBody.slug = stringToSlug(req.validatedBody.title)
    let results = await categoriesService.update(req.validatedBody)
    return responseToClient(res, results)
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    let result = await categoriesService.delete(req.validatedParams)
    return responseToClient(res, result)
  }
}
export const categoriesController: CategoriesController = new CategoriesController()
