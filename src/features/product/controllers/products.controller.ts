import { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { HTTP_STATUS } from '~/globals/constants/http'
import { productsService } from '~/services/db/products.service'
import { generateUniqueString, generateWhereProduct, responseToClient, stringToSlug } from '~/globals/utils/helper'
import { UtilsConstants } from '~/globals/constants/utils.constants'
import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { categoriesService } from '~/services/db/categories.service'
class ProductsController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const {
      page = UtilsConstants.PAGE_DEFAULT,
      limit = UtilsConstants.LIMIT_DEFAULT,
      sortBy = UtilsConstants.SORTBY_DEFAULT,
      sortDir = UtilsConstants.SORT_DIR_DEFAULT
    } = req.validatedBody
    const { filters, searches = [] } = req.validatedBody
    const where = generateWhereProduct(filters, searches)
    const results = await productsService.read({ page, limit, sortBy, sortDir }, where)
    return responseToClient(res, results, HTTP_STATUS.CREATED)
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    if (!Array.isArray(req.validatedParams)) {
      console.log(req.validatedParams)
      const results = await productsService.readOne(req.validatedParams)
      return responseToClient(res, results)
    }
    throw new BadRequestException('ÙÙ‚Ø· ÛŒÚ© Ø§ÛŒ Ø¯ÛŒ Ø¨Ù‡ ØµÙˆØ±Øª Ø§Ø¨Ø¬Øª Ø§Ø±Ø³Ø§Ù„ Ú©Ù†ÛŒØ¯')
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    if (!req.file) return res.status(400).send({ errorMessages: ['image is required'] })

    const { categoryId } = req.validatedBody
    await categoriesService.findById(categoryId)

    const productSchema = {
      ...req.validatedBody,
      categoryId: parseInt(req.body.categoryId),
      mainImage: req.file!.path.replace(/\\/g, '/'),
      uniqueString: generateUniqueString(),
      slug: stringToSlug(req.validatedBody.title)
    }

    let result = await productsService.add(productSchema)
    return responseToClient(res, result, HTTP_STATUS.CREATED)
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const data = {
      ...req.body,
      categoryId: parseInt(req.body.categoryId),
      uniqueString: generateUniqueString(),
      slug: stringToSlug(req.validatedBody.title)
    }
    if (req.file) data.mainImage = req.file!.path

    let result = await productsService.update(req.validatedBody)
    return responseToClient(res, result, HTTP_STATUS.OK)
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const productSchema = { ...req.validatedParams }
    const result = await productsService.remove(productSchema)
    return responseToClient(res, result)
  }
}
export const productsController: ProductsController = new ProductsController()
