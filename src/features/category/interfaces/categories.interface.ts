import { IProduct } from "~/features/product/interfaces/products.interface";

export interface ICategoryBase {
  title: string
  icon: string
}
export interface ICategory {
  id: number;
  title: string;
  icon: string;
  status: boolean;
  slug: string;
  uniqueString: string;
  mainImage: string;
  quantity: number;
  products: IProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryCreate extends ICategoryBase {
  uniqueString: string
  slug: string
  mainImage: string
}

export interface ICategoryGetOne {
  dkp: string
}

export interface ICategoryUpdate extends Partial<ICategoryBase> {
  dkp: string
}

export interface ICategoryGetAll {
  page?: number
  limit?: number
}
