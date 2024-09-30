import { IOrder } from "~/features/order/interfaces/orders.interface"
import { IUser } from "~/features/user/interfaces/user.interface"

export interface IAddressBase {
  provinceId: number // Changed from string to number
  cityId: number // Changed from string to number
  address: string
  postalCode: string
  unit: string
}
export interface IAddress {
  id: number; // Unique identifier for the address
  address: string; // The address line
  postalCode: string; // The postal code
  unit: string; // The unit number (if applicable)
  provinceId: number | null; // Allow null for province ID
  cityId: number | null; // Allow null for city ID
  province: {
      id: number; // Unique identifier for the province
      name: string | null; // Name of the province
      slug: string | null; // Slug for the province (optional)
  } | null; // Nullable if province doesn't exist
  city: {
      id: number; // Unique identifier for the city
      name: string | null; // Name of the city
      slug: string | null; // Slug for the city (optional)
      province_id: number | null; // Reference to the province id
  } | null; // Nullable if city doesn't exist
}

export interface IProvince {
  id: number;
  name?: string; // Optional
  slug?: string; // Optional
  tel_prefix?: string; // Optional
  cities: ICity[];
  addresses: IAddress[];
}
export 
interface ICity {
  id: number;
  name?: string; // Optional
  slug?: string; // Optional
  province_id?: number; // Optional
  province?: IProvince; // Optional
  addresses: IAddress[];
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
