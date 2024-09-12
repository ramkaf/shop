import { IPayload } from './features/user/interfaces/payload.interface'
declare global {
  namespace Express {
    interface Request {
      validatedBody?: any
      validatedParams?: any
      validatedQueries?: any
      currentUser?: IPayload
    }
  }
}
