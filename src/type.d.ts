import { IPayload } from "./features/user/interfaces/payload.interface";

declare global {
    namespace Express {
      interface Request {
        validatedBody?: any;
        validatedParams?: any;
        validatedQueries?: any;
        currentUser? : IPayload;// You can specify a more precise type if you know the structure
      }
    }
}
