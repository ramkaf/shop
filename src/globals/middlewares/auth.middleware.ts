// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { jwtService } from '~/services/db/jwt.service';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader || authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = await jwtService.verifyAccessToken(token);
      if (decoded) {
        req.currentUser = decoded;

      }
    }
  } catch (error) {

  }
  next();
};

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser)
    return res.status(400).json({ message: 'you must logged in' });
  next();
};

export const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
    if (req.currentUser) 
        return res.status(400).json({ message: 'Already logged in' });
    next();
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser || req.currentUser.role !== 'USER') 
        return res.status(403).json({ message: 'Forbidden' });
    next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser || req.currentUser.role !== 'ADMIN')
        return res.status(403).json({ message: 'Forbidden' });
    next();
};
