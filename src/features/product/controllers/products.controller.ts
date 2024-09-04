import { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { HTTP_STATUS } from '~/globals/constants/http'
import { productsService } from '~/services/db/products.service'
import { generateUniqueString, generateWhere, responseToClient, stringToSlug } from '~/globals/utils/helper'
import { UtilsConstants } from '~/globals/constants/utils.constants'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { IPayload } from '~/features/user/interfaces/payload.interface'

class ProductsController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const {
      page = UtilsConstants.PAGE_DEFAULT,
      limit = UtilsConstants.LIMIT_DEFAULT,
      sortBy = UtilsConstants.SORTBY_DEFAULT,
      sortDir = UtilsConstants.SORT_DIR_DEFAULT
    } = req.validatedBody
    const { filters, searches = [] } = req.validatedBody
    const where = generateWhere(filters, searches)
    const results = await productsService.read({ page, limit, sortBy, sortDir }, where)
    return responseToClient(res, results, HTTP_STATUS.CREATED)
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    if (!Array.isArray(req.validatedParams)) {
      console.log(req.validatedParams)

      const results = await productsService.readOne(req.validatedParams)
      return responseToClient(res, results)
    }
    throw new BadRequestException('فقط یک ای دی به صورت ابجت ارسال کنید')
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    let results = []
    const currentUser = req.currentUser
    if (!Array.isArray(req.validatedBody)) {
      req.validatedBody.uniqueString = generateUniqueString()
      req.validatedBody.slug = stringToSlug(req.validatedBody.title)
      req.validatedBody.currentUser = currentUser
      results.push(await productsService.add(req.validatedBody))
      return responseToClient(res, results, HTTP_STATUS.CREATED)
    }
    results = await Promise.all(
      req.validatedBody.map(async (item) => {
        item.uniqueString = generateUniqueString()
        item.slug = stringToSlug(item.title)
        item.currentUser = currentUser
        return await productsService.add(item)
      })
    )
    return responseToClient(res, results, HTTP_STATUS.CREATED)
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    let results = []
    if (!Array.isArray(req.validatedBody)) {
      req.validatedBody.slug = stringToSlug(req.validatedBody.title)
      results.push(await productsService.update(req.validatedBody , req.currentUser as IPayload))
      return responseToClient(res, results, HTTP_STATUS.OK)
    }
    results = await Promise.all(
      req.validatedBody.map(async (item: any) => {
        item.slug = stringToSlug(item.title)
        return await productsService.update(item , req.currentUser as IPayload)
      })
    )
    return responseToClient(res, results)
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    let results = []
    const userId = req.currentUser!.id
    if (!Array.isArray(req.validatedBody)) {
      results.push(await productsService.remove(req.validatedParams , userId))
      return responseToClient(res, results, HTTP_STATUS.OK)
    }
    results = await Promise.all(
      req.validatedBody.map(async (item: any) => {
        return await productsService.remove(item , userId)
      })
    )
    return responseToClient(res, results)
  }
}
export const productsController: ProductsController = new ProductsController()
