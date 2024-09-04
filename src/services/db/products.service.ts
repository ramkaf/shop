import { Product } from '@prisma/client'
import { IProductCreate, IProductGetOne, IProductUpdate } from '~/features/product/interfaces/products.interface'
import { IWhere } from '~/globals/interfaces/global.interface'
import { GetAllOptions, PaginatedResult } from '~/globals/interfaces/global.interface'
import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'
import { prisma } from '~/prisma'
import { generateWhere } from '~/globals/utils/helper'

class ProductsService {
  public async add(productCreate: IProductCreate) {
    const {
      title,
      longDescription,
      shortDescription,
      quantity,
      mainImage,
      categoryId,
      uniqueString,
      slug,
      currentUser
    } = productCreate
    const product = await prisma.product.create({
      data: {
        title,
        longDescription,
        shortDescription,
        quantity,
        mainImage,
        categoryId,
        uniqueString,
        slug,
        userId: currentUser.id
      }
    })
    return product
  }
  public async readOne(productGetOne: IProductGetOne) {
    const { dkp } = productGetOne
    const product = await prisma.product.findFirst({
      where: {
        uniqueString: dkp
      }
    })
    if (!product) throw new BadRequestException('no product found')
    return product
  }
  public async read(getAllOptions: GetAllOptions, where: IWhere): Promise<PaginatedResult<Product>> {
    const { page, limit, sortBy, sortDir } = getAllOptions

    const skip = (page - 1) * limit
    if (page < 1 || limit < 1) {
      throw new NotFoundException('Invalid page or limit value')
    }
    const totalItems = await prisma.product.count({
      where,
      orderBy: {
        [sortBy]: sortDir
      }
    })

    const totalPages = Math.ceil(totalItems / limit)
    if (page > totalPages) {
      return {
        data: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: page,
        limit
      }
    }
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        [sortBy]: sortDir
      }
    })
    return {
      data: products,
      totalItems,
      totalPages,
      currentPage: page,
      limit
    }
  }
  public async update(productUpdate: IProductUpdate) {
    const { dkp, title, longDescription, shortDescription, quantity, mainImage, categoryId, slug } = productUpdate
    const product = await prisma.product.update({
      where: { uniqueString: dkp },
      data: {
        title,
        longDescription,
        shortDescription,
        quantity,
        slug,
        mainImage,
        categoryId
      }
    })
    if (!product) throw new BadRequestException('no product found')
    return product
  }
  public async remove(productGetOne: IProductGetOne) {
    const { dkp } = productGetOne
    const product = await prisma.product.delete({
      where: {
        uniqueString: dkp
      }
    })
    if (!product) throw new BadRequestException('product associated with this dkp is not accessible')
    return product
  }
}

export const productsService: ProductsService = new ProductsService()
