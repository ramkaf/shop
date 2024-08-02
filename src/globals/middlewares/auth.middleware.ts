import { Request, Response, NextFunction } from 'express';
import { ForbiddenException, UnAuthorizedException } from './error.middleware';
import { IPayload } from '~/features/user/interfaces/payload.interface';
import { jwtService } from '~/services/db/jwt.service';
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
     return next()
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await jwtService.verifyAccessToken(token!);
    req.currentUser = decoded;
    next();
  } catch (error) {
    next();
  }
};

const isLogged = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new ForbiddenException("access denied ... only for logged client");
    }
    next();
  };
  const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser || req.currentUser.role !== 'ADMIN') {
      throw new ForbiddenException("access denied ... only for Admins");
    }
    next();
  };
export { authMiddleware , isLogged ,isAdmin};
