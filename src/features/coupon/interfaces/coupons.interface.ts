import { Cart, Coupon } from '@prisma/client'
import { ICart } from '~/features/cart/interfaces/carts.interface'
import { IOrder } from '~/features/order/interfaces/orders.interface'
import { IUser } from '~/features/user/interfaces/user.interface'

export interface ICouponCreate {
  code: any // Coupon code is required
  type: 'VALUE' | 'PERCENTAGE' // Type of discount
  discountValue?: number // Discount value for VALUE type coupons
  percentage?: number // Percentage for PERCENTAGE type coupons
  minBuyPrice?: number // Minimum order value for VALUE type coupons (optional)
  maxDiscount?: number // Maximum discount allowed for PERCENTAGE type coupons (optional)
  expiresAt: Date // Absolute expiration date (required)
  firstOrderOnly?: boolean // Applies to first order only (optional)
  userId?: number // Optional field: if null, coupon applies to all users
  enable: boolean // Enable or disable the coupon
}

export interface ICouponUpdate {
  id: number // Coupon ID to specify which coupon to update
  expiresAt?: Date // Optional, can be updated
  firstOrderOnly?: boolean // Optional, can be updated
  userId?: number | null // Optional, can be updated or set to null
  enable?: boolean // Optional, can be updated
}
export interface IApplyCoupon {
  code: string
  cart: Cart
  userId: number
}


enum CouponType {
  VALUE = 'VALUE',
  PERCENTAGE = 'PERCENTAGE',
}

export interface ICoupon {
  id: number;
  code: string;
  type: CouponType;
  discountValue?: number; // Optional
  percentage?: number; // Optional
  minBuyPrice?: number; // Optional
  maxDiscount?: number; // Optional
  firstOrderOnly: boolean;
  expiresAt: Date;
  userId?: number; // Optional
  creator?: IUser; // Optional
  enable: boolean;
  usedQuantity: number;
  usedPermittedForEachUser?: number; // Optional
  usedPermittedAll?: number; // Optional
  orders: IOrder[];
  users: IUser[]; // Many-to-many
  createdAt: Date;
  updatedAt: Date;
}


export interface IGetCoupon {
  code: string
}
export interface ICouponApplyResponse {
  discount: number
  status: CouponApplyStatus
  coupon : Coupon | null
}

export enum CouponApplyStatus {
  SUCCESS = 'SUCCESS', // Coupon applied successfully
  INVALID_CODE = 'INVALID_CODE',
  FIRST_ORDER_ONLY = 'FIRST_ORDER_ONLY', // Coupon code is invalid
  EXPIRED = 'EXPIRED', // Coupon has expired
  NOT_APPLICABLE = 'NOT_APPLICABLE', // Coupon is not applicable to the cart     // Coupon has already been used
  MINIMUM_REQUIREMENT_NOT_MET = 'MINIMUM_REQUIREMENT_NOT_MET', // Minimum purchase amount not met
  MAX_DISCOUNT_EXCEEDED = 'MAX_DISCOUNT_EXCEEDED', // Maximum discount limit exceeded
  MAX_USAGE_LIMIT = 'MAX_USAGE_LIMIT' // Maximum discount limit exceeded
}

export interface ICouponFilters {
  code?: string
  type?: 'percentage' | 'value'
  minBuyPrice?: number
  firstOrderOnly?: boolean
  expiresBefore?: string
  userId?: number
  enable?: boolean
  creatorId?: number
  beginRange?: string
  endRange?: string
  sortBy?: 'createdAt' | 'expiresAt' | 'usedQuantity' | 'percentage' | 'discountValue'
  sortOrder?: 'asc' | 'desc'
}
