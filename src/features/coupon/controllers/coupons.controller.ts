import { NextFunction, Request, Response } from 'express'
import { RandomStringUtil, responseToClient } from '~/globals/utils/helper'
import { prisma } from '~/prisma'
import couponsService from '../services/coupons.service'

class CouponsController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const couponFilterSchema = {...req.validatedBody}
      const result = await couponsService.getAll(couponFilterSchema)
      return responseToClient(res,result)
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching coupons.' });
    }
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    const { code, expiresIn, expiresAt, userId, ...rest } = req.validatedBody

    let expirationDate: Date
    let couponCode = code ?? RandomStringUtil.generateRandomAlphaNumeric(8)
    let existingCoupon = await couponsService.findOne(couponCode)
    while (existingCoupon) {
      couponCode = RandomStringUtil.generateRandomAlphaNumeric(8) // Generate a new code if it already exists
      existingCoupon = await prisma.coupon.findUnique({
        where: { code: couponCode }
      })
    }

    const now = new Date()
    if (expiresAt) {
      if (expiresAt < now) {
        throw new Error('Expiration date cannot be before the current date.')
      }
      expirationDate = expiresAt
    } else if (expiresIn) {
      switch (expiresIn) {
        case '30m':
          expirationDate = new Date(now.getTime() + 30 * 60 * 1000) // 30 minutes
          break
        case '1d':
          expirationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 1 day
          break
        case '1M':
          expirationDate = new Date(now.setMonth(now.getMonth() + 1)) // 1 month
          break
        case '1y':
          expirationDate = new Date(now.setFullYear(now.getFullYear() + 1)) // 1 year
          break
        default:
          throw new Error('Invalid expiration duration.')
      }
    } else {
      throw new Error('You must provide either an expiration duration or an expiration date.')
    }
    const couponSchema = {
      ...rest,
      code: couponCode,
      expiresAt: expirationDate,
      userId: userId ? userId : undefined
    }
    const coupon = await couponsService.create(couponSchema)
    return responseToClient(res, coupon)
  }
  public async update(req: Request, res: Response, next: NextFunction) {}
  public async delete(req: Request, res: Response, next: NextFunction) {
    const getOneCouponSchema = { ...req.validatedBody }
    const result = await couponsService.remove(getOneCouponSchema)
  }
}

export const couponsController: CouponsController = new CouponsController()
