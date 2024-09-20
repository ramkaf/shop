import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/prisma'
import { ordersService } from '../services/orders.service';

class OrdersController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params;
    const orders = await ordersService.get(id)
  }
  public async getById(req: Request, res: Response, next: NextFunction) {}
  public async create(req: Request, res: Response, next: NextFunction) {}
  public async update(req: Request, res: Response, next: NextFunction) {}
  public async delete(req: Request, res: Response, next: NextFunction) {}
}

export const ordersController: OrdersController = new OrdersController()
