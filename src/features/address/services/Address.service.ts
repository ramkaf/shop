import { prisma } from '~/prisma'
import { BadRequestException, NotFoundException } from '~/globals/middlewares/error.middleware'
import { IAddressCreate, IAddressGetCityOfProvince, IAddressGetOne, IAddressUpdate } from '../interfaces/address.interface'
import redis from '~/globals/services/redisClient'
import redisService from '~/globals/services/redisClient'
import { log } from 'node:console'
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
  public async getCityOfProvince(addressGetCityOfProvince: IAddressGetCityOfProvince) {
    const { province_id } = addressGetCityOfProvince;
    const cacheKey = `province:${province_id}`;
    const cachedResult = await redisService.get(cacheKey);
    
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }
    
    // If cache does not exist, query the database
    const result = await prisma.province.findFirst({
      where: { id: province_id },
      include: { cities: true }
    });
  
    // Check if the result is not empty before caching
    if (result) {
      // Flattening the result
      const formattedResult = result.cities.map(city => ({
        cityId: city.id,
        city: city.name,
        slug: city.slug,
        provinceId: result.id,
      }));
      
      // Save result to Redis cache only if not already cached
      await redisService.set(cacheKey, 'cities', JSON.stringify(formattedResult), 3600); // Cache for 1 hour
      
      return formattedResult;
    } else {
      // Return an empty array or handle as needed if no cities are found
      return [];
    }
  }
  
  public async getAllProvinces() {
    
    const cacheKey = 'province:all';
    const cachedResult = await redisService.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }
    const provinces = await prisma.province.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        tel_prefix: true,
      },
    });

    // Check if result is not empty before caching
    if (provinces.length > 0) {
      // Save result to Redis cache
      await redisService.set(cacheKey,'province', JSON.stringify(provinces) , 24*60*60*1000); // Cache for 1 hour

      return provinces;
    } else {
      // Return an empty array if no provinces are found
      return [];
    }
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
