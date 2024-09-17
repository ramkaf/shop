import { Cart } from "@prisma/client"

export interface ICouponCreate {
  code: string // Coupon code is required
  type: 'VALUE' | 'PERCENTAGE' // Type of discount
  discountValue?: number // Discount value for VALUE type coupons
  percentage?: number // Percentage for PERCENTAGE type coupons
  minBuyPrice?: number // Minimum order value for VALUE type coupons
  maxDiscount?: number // Maximum discount allowed for PERCENTAGE type coupons
  expiresIn?: '30m' | '1d' | '1M' | '1y' // Expiration duration
  expiresAt: Date // Absolute expiration date (required)
  firstOrderOnly?: boolean // Applies to first order only
  userId?: number // Optional field: if null, coupon applies to all users
  enable: boolean // Enable or disable the coupon
}

export interface IApplyCoupon {
    code: string,
   cart:Cart
   userId: number
}

export interface IGetCoupon {
    code: string
}