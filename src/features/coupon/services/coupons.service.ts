import { PrismaClient } from '@prisma/client'
import { isBefore } from 'date-fns'
import {
  CouponApplyStatus,
  IApplyCoupon,
  ICouponApplyResponse,
  ICouponCreate,
  ICouponFilters,
  ICouponUpdate,
  IGetCoupon
} from '../interfaces/coupons.interface'
import { HTTP_STATUS } from '~/globals/constants/http'
const prisma = new PrismaClient()

class CouponService {
  async create(couponCreate: ICouponCreate) {
    return await prisma.coupon.create({
      data: couponCreate
    })
  }
  async get(getCoupon: IGetCoupon) {
    const coupon = await prisma.coupon.findFirst({
      where: getCoupon
    })
    return coupon
  }
  async getAll(couponFilter: ICouponFilters) {
    const {
      code,
      type,
      minBuyPrice,
      firstOrderOnly,
      expiresBefore,
      userId,
      enable,
      creatorId,
      beginRange,
      endRange,
      sortBy = 'createdAt', // Default sort by createdAt
      sortOrder = 'asc' // Default sort order is ascending
    } = couponFilter
    const whereClause: any = {
      code,
      type,
      minBuyPrice: minBuyPrice ? { gte: minBuyPrice } : undefined,
      firstOrderOnly,
      userId,
      enable,
      creator: creatorId ? { id: creatorId } : undefined
    }

    // Add date range conditions if provided
    if (beginRange && endRange) {
      const dateRange = { gte: new Date(beginRange), lte: new Date(endRange) }
      whereClause.createdAt = dateRange
      whereClause.expiresAt = dateRange
    } else if (beginRange) {
      const startDate = new Date(beginRange)
      whereClause.createdAt = { gte: startDate }
      whereClause.expiresAt = { gte: startDate }
    } else if (endRange) {
      const endDate = new Date(endRange)
      whereClause.createdAt = { lte: endDate }
      whereClause.expiresAt = { lte: endDate }
    }

    // Query the database with validated filters and sorting options
    const coupons = await prisma.coupon.findMany({
      where: whereClause,
      orderBy: {
        [sortBy]: sortOrder
      }
    })
    return coupons
  }
  async update(id: number, couponUpdate: ICouponUpdate) {
    return await prisma.coupon.update({
      where: { id },
      data: couponUpdate
    })
  }
  async apply(applyCoupon: IApplyCoupon): Promise<ICouponApplyResponse> {
    const { code, cart, userId } = applyCoupon
    const { totalPrice } = cart
    const coupon = await this.get({ code })

    if (!coupon) {
      return { discount: 0, status: CouponApplyStatus.INVALID_CODE }
    }

    if (coupon.userId && coupon.userId !== userId) return { discount: 0, status: CouponApplyStatus.INVALID_CODE }

    if (isBefore(coupon.expiresAt, new Date())) return { discount: 0, status: CouponApplyStatus.EXPIRED }

    if (coupon.firstOrderOnly) {
      const existingOrders = await prisma.order.count({
        where: { userId }
      })

      if (existingOrders > 0) {
        return { discount: 0, status: CouponApplyStatus.FIRST_ORDER_ONLY }
      }
    }

    if (coupon.usedPermittedForEachUser) {
      if (await this.couponUsed(userId, code, coupon.usedPermittedForEachUser)) {
        if (coupon.usedPermittedAll && coupon.usedPermittedAll <= coupon.usedQuantity)
          return { discount: 0, status: CouponApplyStatus.MAX_DISCOUNT_EXCEEDED }
        if (coupon.type === 'VALUE') {
          if (totalPrice < coupon.minBuyPrice!) {
            return {
              discount: 0,
              status: CouponApplyStatus.MINIMUM_REQUIREMENT_NOT_MET,
              minPrice: coupon.minBuyPrice
            }
          }
          return { discount: coupon.discountValue ?? 0, status: CouponApplyStatus.SUCCESS }
        }

        if (coupon.type === 'PERCENTAGE') {
          const discount = (totalPrice * coupon.percentage!) / 100
          const finalDiscount = coupon.maxDiscount && discount > coupon.maxDiscount ? coupon.maxDiscount : discount
          return { discount: finalDiscount, status: CouponApplyStatus.SUCCESS }
        }
      }
      return { discount: 0, status: CouponApplyStatus.MAX_USAGE_LIMIT }
    }
    return { discount: 0, status: CouponApplyStatus.INVALID_CODE }
  }
  async addUsageCount(couponCode: string) {
    const coupon = await prisma.coupon.update({
      where: {
        code: couponCode // Match the coupon by its code
      },
      data: {
        usedQuantity: {
          increment: 1 // Increment the `usedQuantity` by 1
        }
      }
    })
  }
  async couponUsed(userId: number, couponCode: string, permittedCount: number) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        coupon: {
          where: {
            code: couponCode
          }
        }
      }
    })
    const count = user && user.coupon.length ? user.coupon.length : 0
    if (count < permittedCount) return true
  }
  async findOne(couponCode: string) {
    const coupon = prisma.coupon.findUnique({
      where: { code: couponCode }
    })
    return coupon
  }
  async remove(getCoupon: IGetCoupon) {
    const { code } = getCoupon
    const coupon = await prisma.coupon.delete({
      where: {
        code
      }
    })
    return coupon
  }
}

export default new CouponService()
