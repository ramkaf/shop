import { Product } from '@prisma/client'
import { IProductCreate, IProductGetOne, IProductUpdate } from '~/features/product/interfaces/products.interface'
import { IWhere } from '~/globals/interfaces/global.interface'
import { GetAllOptions, PaginatedResult } from '~/globals/interfaces/global.interface'
import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'
import { prisma } from '~/prisma'

class ProductsService {
  public async add(productCreate: IProductCreate): Promise<Product> {
    const product = await prisma.product.create({
      data: productCreate
    })
    if (!product) throw new BadRequestException('invalid credential')
    return product
  }
  public async readOne(productGetOne: IProductGetOne) {
    const { dkp } = productGetOne
    const product = await prisma.product.findFirst({
      where: {
        uniqueString: dkp
      },
      include: {
        variant: {
          include: {
            variantItems: true
          }
        }
      }
    })
    if (!product) throw new BadRequestException('no product found')
    return product
  }
  public async findById(id: number) {
    const product = await prisma.product.findFirst({
      where: {
        id
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
      },
      include: {
        variant: {
          include: {
            variantItems: true
          }
        }
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
  public async update(productUpdate: IProductUpdate): Promise<Product> {
    try {
      const {dkp} = productUpdate
      const whereClause = { uniqueString: dkp }
      const product = await prisma.product.update({
        where: whereClause,
        data: productUpdate
      }
      )
      return product
    } catch (error) {
      console.log(error)
      throw new BadRequestException('something goes wrong')
    }
  }
  public async remove(productGetOne: IProductGetOne) {
    try {
      const { dkp } = productGetOne
      const product = await prisma.product.delete({
        where: {
          uniqueString: dkp
        }
      })
      return product
    } catch (error) {
      throw new BadRequestException('something goes wrong')
    }
  }
}
export const productsService: ProductsService = new ProductsService()
