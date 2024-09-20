import { PrismaClient } from '@prisma/client'
import { isBefore } from 'date-fns'
import { IApplyCoupon, ICouponCreate, ICouponFilters, ICouponUpdate, IGetCoupon } from '../interfaces/coupons.interface'
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
  async update(id: number, couponUpdate: ICouponUpdate) {
    return await prisma.coupon.update({
      where: { id },
      data: couponUpdate
    });
  }
  async apply(applyCoupon: IApplyCoupon) {
    const { code, cart, userId } = applyCoupon
    const { totalPrice } = cart
    const coupon = await this.get({ code })

    if (!coupon) {
      throw new Error('Invalid coupon code.')
    }

    if (coupon.userId && coupon.userId !== userId) {
      throw new Error('This coupon is not available for your account.')
    }

    if (isBefore(coupon.expiresAt, new Date())) {
      throw new Error('Coupon has expired.')
    }

    if (coupon.firstOrderOnly) {
      const existingOrders = await prisma.order.count({
        where: { userId }
      })

      if (existingOrders > 0) {
        return { discount: 0, message: "This coupon is only valid for the user's first order." }
      }
    }

    if (coupon.usedPermittedForEachUser) {
      if (await this.couponUsed(userId, code, coupon.usedPermittedForEachUser)) {
        if (coupon.usedPermittedAll && coupon.usedPermittedAll <= coupon.usedQuantity)
          return { discount: 0, message: 'Coupon usage limit exceeded' }
        if (coupon.type === 'VALUE') {
          if (totalPrice < coupon.minBuyPrice!) {
            return { discount: 0, message: `Minimum purchase amount is ${coupon.minBuyPrice}.` }
          }
          return { discount: coupon.discountValue, message: 'coupon successfully applied' }
        }

        if (coupon.type === 'PERCENTAGE') {
          const discount = (totalPrice * coupon.percentage!) / 100
          const finalDiscount = coupon.maxDiscount && discount > coupon.maxDiscount ? coupon.maxDiscount : discount
          return { discount: finalDiscount }
        }
      }
      return { discount: 0, message: 'Coupon usage limit exceeded' }
    }
    return { discount: 0, message: 'Invalid coupon type.' }
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
  async getAll(couponFilter : ICouponFilters){
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
      sortOrder = 'asc'     // Default sort order is ascending
    } = couponFilter
    const whereClause: any = {
      code,
      type,
      minBuyPrice: minBuyPrice ? { gte: minBuyPrice } : undefined,
      firstOrderOnly,
      userId,
      enable,
      creator: creatorId ? { id: creatorId } : undefined,
    };

    // Add date range conditions if provided
    if (beginRange && endRange) {
      const dateRange = { gte: new Date(beginRange), lte: new Date(endRange) };
      whereClause.createdAt = dateRange;
      whereClause.expiresAt = dateRange;
    } else if (beginRange) {
      const startDate = new Date(beginRange);
      whereClause.createdAt = { gte: startDate };
      whereClause.expiresAt = { gte: startDate };
    } else if (endRange) {
      const endDate = new Date(endRange);
      whereClause.createdAt = { lte: endDate };
      whereClause.expiresAt = { lte: endDate };
    }

    // Query the database with validated filters and sorting options
    const coupons = await prisma.coupon.findMany({
      where: whereClause,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
    return coupons
  }
}

export default new CouponService()
