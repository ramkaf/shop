import { Address, OrderItem, User } from '@prisma/client'
import { IAddress } from '~/features/address/interfaces/address.interface'
import { ICart } from '~/features/cart/interfaces/carts.interface'
import { ICoupon } from '~/features/coupon/interfaces/coupons.interface'
import { IVariantItem } from '~/features/productVariant/interfaces/variants.interface'
import { IUser } from '~/features/user/interfaces/user.interface'


export interface IOrderCreate {
  uniqueString: string;
  discount: number; // finalDiscount
  userId: number;
  cart: ICart;
  recipientName : string,
  recipientLastName: string;
  recipientNumber: string;
  shippingDate: Date;
  shippingCost: number;
  servicePrice: number;
  finalPrice: number;
  addressId: number; // Assuming you have an IAddress interface
  couponId : number | null // Assuming coupon is optional and you have an ICoupon interface
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
  addressId: number;
  isPaid: boolean;
  isDelivered: boolean;
  couponId:number | null,
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
