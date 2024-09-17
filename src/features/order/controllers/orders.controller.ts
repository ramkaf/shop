import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'

class OrdersController {
  public async getAll(req: Request, res: Response, next: NextFunction) {}
  public async getById(req: Request, res: Response, next: NextFunction) {}
  public async create(req: Request, res: Response, next: NextFunction) {}
  public async update(req: Request, res: Response, next: NextFunction) {}
  public async delete(req: Request, res: Response, next: NextFunction) {}
}

export const ordersController: OrdersController = new OrdersController()
