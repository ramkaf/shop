import { Address, OrderItem, User } from '@prisma/client'
import { IAddress } from '~/features/address/interfaces/address.interface'
import { ICoupon } from '~/features/coupon/interfaces/coupons.interface'
import { IVariantItem } from '~/features/productVariant/interfaces/variants.interface'
import { IUser } from '~/features/user/interfaces/user.interface'

export interface IOrderCreate {
  id: number
  uniqueString: string
  discount: number
  userId: number
  user?: User | null // Assuming you have an IUser interface for the User relation
  orderItem: OrderItem[] // Assuming you have an IOrderItem interface for OrderItem
  recipientName: string
  recipientLastName: string
  recipientNumber: string
  deliveringDate: string // As you specified this as a String
  ShippingDate: Date
  ShippingCost: number
  cartPrice: number
  servicePrice: number
  finalPrice: number
  addressId: number
  address?: Address // Assuming you have an IAddress interface for Address
  isPaid: boolean
  isDelivered: boolean
  createdAt: Date
  updatedAt: Date
}
export interface IOrder {
  id: number;
  uniqueString: string;
  discount: number;
  user?: IUser; // Optional
  userId?: number; // Optional
  orderItem: IOrderItem[];
  recipientName: string;
  recipientLastName: string;
  recipientNumber: string;
  deliveringDate: string;
  ShippingDate: Date;
  ShippingCost: number;
  cartPrice: number;
  servicePrice: number;
  finalPrice: number;
  address: IAddress;
  addressId: number;
  isPaid: boolean;
  isDelivered: boolean;
  coupon?: ICoupon; // Optional
  couponId?: number; // Optional
  createdAt: Date;
  updatedAt: Date;
}
export interface IOrderItem {
  id: number;
  order: IOrder;
  orderId: number;
  price: number;
  variant: IVariantItem;
  variantId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderUpdate {}
