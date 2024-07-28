import { IPayload } from "./features/user/interface/payload.interface";

declare global {
    namespace Express {
      interface Request {
        validatedBody?: any;
        currentUser? : IPayload // You can specify a more precise type if you know the structure
      }
    }
}