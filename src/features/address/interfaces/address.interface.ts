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
  id: number;
  provinceId?: number; // Optional
  cityId?: number; // Optional
  province?: IProvince; // Optional
  city?: ICity; // Optional
  address: string;
  postalCode: string;
  unit: string;
  user: IUser;
  userId: number;
  order: IOrder[];
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
