import { Cart } from '@prisma/client'

export interface ICouponCreate {
  code: string // Coupon code is required
  type: 'VALUE' | 'PERCENTAGE' // Type of discount
  discountValue?: number // Discount value for VALUE type coupons
  percentage?: number // Percentage for PERCENTAGE type coupons
  minBuyPrice?: number // Minimum order value for VALUE type coupons
  maxDiscount?: number // Maximum discount allowed for PERCENTAGE type coupons
  expiresAt: Date // Absolute expiration date (required)
  firstOrderOnly?: boolean // Applies to first order only
  userId?: number // Optional field: if null, coupon applies to all users
  enable: boolean // Enable or disable the coupon
}

export interface ICouponUpdate {
  id: number; // Coupon ID to specify which coupon to update
  expiresAt?: Date; // Optional, can be updated
  firstOrderOnly?: boolean; // Optional, can be updated
  userId?: number | null; // Optional, can be updated or set to null
  enable?: boolean; // Optional, can be updated
}
export interface IApplyCoupon {
  code: string
  cart: Cart
  userId: number
}

export interface IGetCoupon {
  code: string
}

export interface ICouponFilters {
  code?: string;
  type?: 'percentage' | 'value';
  minBuyPrice?: number;
  firstOrderOnly?: boolean;
  expiresBefore?: string;
  userId?: number;
  enable?: boolean;
  creatorId?: number;
  beginRange?: string;
  endRange?: string;
  sortBy?: 'createdAt' | 'expiresAt' | 'usedQuantity' | 'percentage' | 'discountValue'; 
  sortOrder?: 'asc' | 'desc'; 
}