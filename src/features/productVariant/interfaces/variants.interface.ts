export interface IVariantCreate {
  name: string
  productId: number
}

export interface IVariantGetOne {
  id: number
}
export interface IVariantItemCreate {
  variantId: number
  name: string
  price : number
  quantity : number
}

export interface IVariantItemGetOne {
  id: number
}
