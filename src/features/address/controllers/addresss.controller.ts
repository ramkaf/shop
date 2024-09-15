import { NextFunction, Request, Response } from 'express'
import { responseToClient } from '~/globals/utils/helper'
import { prisma } from '~/prisma'
import { addressesService } from '../services/Addresss.service'

class AddressesController {
  public async getById(req: Request, res: Response, next: NextFunction) {}
  public async create(req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.currentUser
    const addressSchema = { ...req.validatedBody, userId }
    const address = await addressesService.create(addressSchema)
    return responseToClient(res, address)
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    const addressSchema = { ...req.validatedBody }
    const result = await addressesService.update(addressSchema)
    return responseToClient(res, result)
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    const deleteAddressSchema = { ...req.validatedParams }
    const address = addressesService.delete(deleteAddressSchema)
    return responseToClient(res, address)
  }
}

export const addressesController: AddressesController = new AddressesController()
