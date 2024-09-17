import { prisma } from '~/prisma'
import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'
import { IAddressCreate, IAddressGetOne, IAddressUpdate } from '../interfaces/address.interface'
class AddressesService {
  public async getAddressesOfAUser(id: number) {
    const result = prisma.user.findFirst({
      where: {
        id
      },
      include: {
        address: true
      }
    })
    return result
  }
  public async get(addressGetOne: IAddressGetOne) {
    const { id } = addressGetOne
    const result = prisma.user.findFirst({
      where: {
        id
      }
    })
    return result
  }
  public async create(addressCreate: IAddressCreate) {
    const result = prisma.address.create({
      data: addressCreate
    })
    return result
  }
  public async update(addressUpdate: IAddressUpdate) {
    const { id, ...address } = addressUpdate
    const result = prisma.address.update({
      data: address,
      where: {
        id
      }
    })
    return result
  }
  public async delete(addressGetOne: IAddressGetOne) {
    try {
      const { id } = addressGetOne
      const result = prisma.address.delete({
        where: {
          id
        }
      })
      if (!result) throw new BadRequestException('something wrong')
      return result
    } catch (error) {
      throw new NotFoundException('something wrong')
    }
  }
}

export const addressesService: AddressesService = new AddressesService()
