import { ICartItem } from "~/features/cart/interfaces/carts.interface";

export interface IVariantCreate {
  name: string
  productId: number
}
export interface IVariant {
  id: number;
  name: string;
  product: IProduct;
  productId: number;
  variantItems: IVariantItem[];
}
export interface IVariantItem {
  id: number;
  variant: IVariant;
  variantId: number;
  name: string;
  quantity: number;
  price: number;
  cartItem: ICartItem[];
  orderItem: IOrderItem[];
}
export interface IVariantGetOne {
  id: number
}
export interface IVariantItemCreate {
  variantId: number
  name: string
  price: number
  quantity: number
}

export interface IVariantItemGetOne {
  id: number
}
