import { Request, Response, NextFunction } from 'express'
import { ForbiddenException, UnAuthorizedException } from './error.middleware'
import { IPayload } from '~/features/user/interfaces/payload.interface'
import { jwtService } from '~/services/db/jwt.service'
import { prisma } from '~/prisma'
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next()
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = await jwtService.verifyAccessToken(token!)
    req.currentUser = decoded
    next()
  } catch (error) {
    next()
  }
}

const isLogged = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new ForbiddenException('access denied ... only for logged client')
  }
  next()
}
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser || req.currentUser.role !== 'ADMIN') {
    throw new ForbiddenException('access denied ... only for Admins')
  }
  next()
}

const ownershipMiddleware = (model: 'category' | 'product') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.currentUser!.id
    const items: { dkp: string }[] = req.body
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Request body must be a non-empty array' })
    }
    try {
      const checkOwnershipPromises = items.map(async (item) => {
        const record = await (prisma[model] as any).findFirst({
          where: { uniqueString: item.dkp },
          select: { userId: true }
        })
        if (!record) {
          throw new Error(`${model.charAt(0).toUpperCase() + model.slice(1)} with dkp ${item.dkp} not found`)
        }
        if (record.userId !== userId) {
          throw new Error(`You do not have permission to perform this action on ${model} with dkp ${item.dkp}`)
        }
      })
      await Promise.all(checkOwnershipPromises)
      next()
    } catch (err: any) {
      res.status(403).json({ message: err.message })
    }
  }
}

export { authMiddleware, isLogged, isAdmin }
