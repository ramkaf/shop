import { IPayload } from "./payload.interface"

export interface IAuthRegister {
  email: string
  firstName: string
  lastName: string
  username: string
  avatar: string
  password: string
}
export interface IAuthLogin {
  email: string
  password: string
}

export interface IAvatar {
  path : string
  payload : IPayload
}
