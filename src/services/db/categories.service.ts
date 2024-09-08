import { Category } from '@prisma/client'
import { ICategoryCreate, ICategoryGetOne, ICategoryUpdate } from '~/features/category/interfaces/categories.interface'
import { prisma } from '~/prisma'
import { PaginatedResult, GetAllOptions } from '../../globals/interfaces/global.interface'
import { IWhere } from '~/globals/interfaces/global.interface'
import { BadRequestException } from '~/globals/middlewares/error.middleware'

class CategoriesService {
  public async add(body: ICategoryCreate): Promise<Category> {
    const { title, icon, slug, uniqueString , currentUser} = body
    const category: Category = await prisma.category.create({
      data: {
        title,
        icon,
        status: true,
        slug,
        uniqueString,
        userId : currentUser.id
      }
    })
    return category
  }
  public async read(getAllOptions: GetAllOptions, where: IWhere): Promise<PaginatedResult<Category>> {
    const { page, limit, sortBy, sortDir } = getAllOptions
    const skip = (page - 1) * limit
    const totalItems = await prisma.category.count()
    const totalPages = Math.ceil(totalItems / limit)
    if (page > totalPages) {
      return {
        data: [],
        totalItems,
        totalPages,
        currentPage: page,
        limit
      }
    }
    const categories: Category[] = await prisma.category.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        [sortBy]: sortDir
      }
    })

    return {
      data: categories,
      totalItems,
      totalPages,
      currentPage: page,
      limit
    }
  }
  public async readOne(param: ICategoryGetOne): Promise<Category | null> {
    const { dkp } = param
    const category = await prisma.category.findFirst({
      where: {
        uniqueString: dkp,
        status: true
      }
    })
    if (!category) throw new BadRequestException('no category found')
    return category
  }
  public async update(body: ICategoryUpdate): Promise<Category | null> {
    const { dkp, title, icon } = body
    const category = await prisma.category.update({
      where: { uniqueString: dkp },
      data: { title, icon }
    })
    if (!category) throw new BadRequestException('no category found')
    return category
  }
  public async delete(body: ICategoryGetOne): Promise<Category | null> {
    const { dkp } = body
    const category = await prisma.category.delete({
      where: {
        uniqueString: dkp
      }
    })
    if (!category) throw new BadRequestException('no category found')
    return category
  }
}

export const categoriesService: CategoriesService = new CategoriesService()
