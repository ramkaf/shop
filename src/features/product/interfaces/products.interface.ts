import { IPayload } from '../../user/interfaces/user.interface'

export interface IProductBase {
  title: string
  longDescription: string
  shortDescription: string
  quantity: number
  slug: string
  uniqueString: string
  mainImage: string
  categoryId: number
}
export interface IProductCreate extends IProductBase {}
export interface IProductUpdate extends IProductBase {
  dkp: string
}
export interface IProductGetOne {
  dkp: string
}
