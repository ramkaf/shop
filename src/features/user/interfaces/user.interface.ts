export interface IAuthRegister {
  email: string
  firstName: string
  lastName: string
  username: string
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
  wishList: IWishlist[];
  address: IAddress[];
  order: IOrder[];
  coupon: ICoupon[]; // Created Coupons
  cart?: ICart; // Optional
  coupons: ICoupon[]; // User Coupons
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
