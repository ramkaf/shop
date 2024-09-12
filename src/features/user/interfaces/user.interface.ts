import { IPayload } from "./payload.interface"

export interface IAuthRegister {
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
}
export interface IAuthLogin {
  email: string
  password: string
}

export interface IUserUpdate {
  path? : string
  payload : IPayload
  firstName? : string
  lastName? :string
}

export interface IGetUser {
  email? : string
  username? :string
  id? : number
}


export interface IUpdatePassword {
  id : number ,
  password : string
}