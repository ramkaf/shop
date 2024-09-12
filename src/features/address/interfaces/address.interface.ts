export interface IAddressBase {
  country: string
  province: string
  city: string
  address: string
  postalCode: string
  unit: string
}

export interface IAddressCreate extends IAddressBase {
  userId: number
}

export interface IAddressUpdate extends Partial<IAddressBase> {
  id: number
}

export interface IAddressGetOne {
  id: number
}
