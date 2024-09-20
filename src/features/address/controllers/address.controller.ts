import { NextFunction, Request, Response } from 'express'
import { responseToClient } from '~/globals/utils/helper'
import { prisma } from '~/prisma'
import { addressesService } from '../services/Address.service'
import { log } from 'node:console'

class AddressesController {
  public async getProvinces(req: Request, res: Response, next: NextFunction) {
    const provinces = await addressesService.getAllProvinces()
    return responseToClient(res,provinces)
  }
  public async getCityOfProvince(req: Request, res: Response, next: NextFunction) {
    const {province_id} = req.validatedParams
    const provinces = await addressesService.getCityOfProvince({province_id})
    return responseToClient(res,provinces)
  }
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
