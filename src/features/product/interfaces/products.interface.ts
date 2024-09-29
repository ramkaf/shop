import { IVariant } from '~/features/productVariant/interfaces/variants.interface'
import { IPayload } from '../../user/interfaces/user.interface'
import { IWishlist } from '~/features/wishList/interfaces/wishLists.interface'
import { ICategory } from '~/features/category/interfaces/categories.interface'

export interface IProductBase {
  title: string
  longDescription: string
  shortDescription: string
  slug: string
  uniqueString: string
  mainImage: string
  categoryId: number
}

interface IProductImage {
  id: number;
  image: string;
  product: IProduct;
  productId: number;
}
export interface IProduct {
  id: number;
  title: string;
  longDescription: string;
  shortDescription: string;
  price?: number; // Optional
  quantity: number;
  mainImage: string;
  productImage: IProductImage[];
  variant: IVariant[];
  wishList: IWishlist[];
  slug: string;
  uniqueString: string;
  categoryId: number;
  category: ICategory;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProductCreate extends IProductBase {}
export interface IProductUpdate extends IProductBase {
  dkp: string
}
export interface IProductGetOne {
  dkp: string
}
