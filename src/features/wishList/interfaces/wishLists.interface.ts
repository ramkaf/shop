import { IProduct } from "~/features/product/interfaces/products.interface";
import { IUser } from "~/features/user/interfaces/user.interface";

export interface IWishListCreate {
  userId: number
  productId: number
}

export interface IWishListGetOne {
  id: number
}
export interface IWishlist {
  id: number;
  userId: number;
  productId: number;
  createdAt: Date;
  user: IUser;
  product: IProduct;
}

export interface IWishDelete {
  id: number
  userId: number
}
