import { Response } from 'express'
import { IFilter, ISearch } from '../interfaces/global.interface'
import { any, string } from 'joi'

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
  const timestamp = Date.now() // Current timestamp
  const randomNum = Math.floor(Math.random() * 1000000) // Random number between 0 and 9999
  const uniqueNumber = (timestamp + randomNum).toString().slice(-10) // Ensure the number is 7 digits long
  return prefix + uniqueNumber
}
export function stringToSlug(str: string) {
  return str
    .toLowerCase() // Convert the string to lowercase
    .trim() // Remove whitespace from both ends of the string
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '') // Remove all non-alphanumeric characters except spaces, hyphens, and Persian letters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}
export function generateWhere(filters: IFilter[], searches: ISearch[]): Record<string, any> {
  const where: Record<string, any> = {}

  // Handle filters
  if (filters && filters.length > 0) {
    filters.forEach((item: IFilter) => {
      const { field, condition, value } = item

      // Ensure the where object for the field exists
      if (!where[field]) {
        where[field] = {}
      }

      // Set the condition with its value
      where[field][condition] = value
    })
  }

  // Handle searches
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
