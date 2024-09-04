import { IPayload } from '../../user/interfaces/payload.interface'
export interface IProductCreate {
  title: string
  longDescription: string
  shortDescription: string
  quantity: number
  slug: string
  uniqueString: string
  mainImage: string
  categoryId: number
  currentUser: IPayload
}

export interface IProductUpdate {
  dkp: string
  title: string
  longDescription: string
  shortDescription: string
  slug: string
  quantity: number
  mainImage: string
  categoryId: number
}

export interface IProductGetOne {
  dkp: string
}
