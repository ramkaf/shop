import { IVariantItem } from "~/features/productVariant/interfaces/variants.interface";
import { IUser } from "~/features/user/interfaces/user.interface"

export interface ICartItemCreate {
  variantItemId: number
  userId: number
  price: number
}

export interface ICartItem {
  id: number;
  cart: ICart;
  cartId: number;
  variant: IVariantItem;
  variantId: number;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICart {
  id: number;
  totalPrice: number;
  user: IUser;
  userId: number; // Unique
  cartItems: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartResponse {
  cart: ICart | null // Cart can be null if not found
  totalPrice: number // Total price of items in the cart
}
