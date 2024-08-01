import { Request, Response, NextFunction } from 'express';
import { ForbiddenException, UnAuthorizedException } from './error.middleware';
import { IPayload } from '~/features/user/interfaces/payload.interface';
import { jwtService } from '~/services/db/jwt.service';
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthorizedException("Token is invalid ... please login again");
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await jwtService.verifyAccessToken(token!);
    req.currentUser = decoded;
    next();
  } catch (error) {
    throw new UnAuthorizedException("Token is invalid ... please login again");
  }
};

const isLogged = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new ForbiddenException("access denied");
    }
    next();
  };

export { authMiddleware , isLogged };
