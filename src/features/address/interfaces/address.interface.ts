export interface IAddressBase {
  provinceId: number // Changed from string to number
  cityId: number // Changed from string to number
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

export interface IAddressGetCityOfProvince {
  province_id: number
}
