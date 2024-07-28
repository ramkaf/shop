import 'express-async-errors'
import jwt from 'jsonwebtoken'
import { IPayload } from '~/features/user/interface/payload.interface';
class JwtService {
    public async generateAccessToken (payload:IPayload):Promise<string>{
        const accessToken: string = jwt.sign(payload, process.env.ACCESS_TOKEN!, { expiresIn: '1d' });
        return accessToken
      }
      public async verifyAccessToken(token: string): Promise<any> {
          const payload = jwt.verify(token, process.env.ACCESS_TOKEN!) as IPayload;
          return payload;
      }
}

export const jwtService = new JwtService();