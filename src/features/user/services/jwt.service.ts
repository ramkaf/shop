import { User } from '@prisma/client'
import 'express-async-errors'
import jwt from 'jsonwebtoken'
import { IPayload } from '~/features/user/interfaces/user.interface'

class JwtService {
  public async generateAccessToken(user: User): Promise<string> {
    const { id, firstName, lastName, email, role } = user
    const accessToken: string = jwt.sign({ id, firstName, lastName, email, role }, process.env.ACCESS_TOKEN!, {
      expiresIn: '30d'
    })
    return accessToken
  }
  public async verifyAccessToken(token: string): Promise<any> {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN!) as IPayload
    return payload
  }
}
export const jwtService = new JwtService()
