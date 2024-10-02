import { Address, Cart, Coupon, Order, Wishlist } from "@prisma/client"

export interface IAuthRegister {
  email: string
  firstName: string
  lastName: string
  username: string
  mobile : string
  password: string
}
export interface IAuthLogin {
  email: string
  password: string
}
export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  role: Role;
  isActive: boolean;
  wishList: Wishlist[];
  address: Address[];
  order: Order[];
  coupon: Coupon[]; // Created Coupons
  cart?: Cart; // Optional
  coupons: Coupon[]; // User Coupons
  createdAt: Date;
  updatedAt: Date;
}
enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUserUpdate {
  path?: string
  payload: IPayload
  firstName?: string
  lastName?: string
}

export interface IGetUser {
  email?: string
  username?: string
  mobile? : string
  id?: number
}

export interface IUpdatePassword {
  id: number
  password: string
}

export interface IPayload {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}
