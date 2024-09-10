import { Response } from 'express'
import { IFilter, ISearch } from '../interfaces/global.interface'
import { any, string } from 'joi'
import { IPayload } from '~/features/user/interfaces/payload.interface'
import { ForbiddenException } from '../middlewares/error.middleware'
export function responseToClient(
  res: Response,
  data: any,
  statusCode: number = 200,
  message: string = 'عملیات با موفقیت انجام شد'
) {
  return res.status(statusCode).json({
    message,
    data
  })
}
export function getDefaultPaginationOptions() {
  return {
    page: 1,
    limit: 10
  }
}
export function generateUniqueString() {
  const prefix = 'dkp-'
  const timestamp = Date.now() 
  const randomNum = Math.floor(Math.random() * 1000000) 
  const uniqueNumber = (timestamp + randomNum).toString().slice(-10) 
  return prefix + uniqueNumber
}
export function stringToSlug(str: string) {
  return str
    .toLowerCase() 
    .trim() 
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-')
    .concat(Math.floor(Math.random()*1000).toString()) 
}
export function generateWhereProduct(filters: IFilter[], searches: ISearch[]): Record<string, any> {
  const where: Record<string, any> = {}
  if (filters && filters.length > 0) {
    filters.forEach((item: IFilter) => {
      const { field, condition, value } = item
      if (!where[field]) {
        where[field] = {}
      }
      where[field][condition] = value
    })
  }
  if (searches.length > 0) {
    where.OR = [
      {
        title: {
          contains: searches
        }
      },
      {
        longDescription: {
          contains: searches
        }
      }
    ]
  }
  return where
}
export function generateWhereCategory(filters: IFilter[], searches: ISearch[]): Record<string, any> {
  const where: Record<string, any> = {}
  if (filters && filters.length > 0) {
    filters.forEach((item: IFilter) => {
      const { field, condition, value } = item
      if (!where[field]) {
        where[field] = {}
      }
      where[field][condition] = value
    })
  }
  if (searches.length > 0) {
    where.OR = [
      {
        title: {
          contains: searches
        }
      }
    ]
  }
  return where
}

export function checkUserPermission(model:any , payload:IPayload){
  const {id} = payload
  const {userId} = model
  if (id !== userId)
    throw new ForbiddenException("forbidden")
}