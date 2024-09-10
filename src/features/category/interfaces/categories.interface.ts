import { IPayload } from "~/features/user/interfaces/payload.interface"
export interface ICategoryCreate {
  title: string
  icon: string
  uniqueString: string
  slug: string
}
export interface ICategoryGetOne {
  dkp: string
}
export interface ICategoryUpdate {
  dkp: string
  title: string
  icon: string
}
export interface ICategoryGetAll {
  page?: number
  limit?: number
}
