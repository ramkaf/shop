import { BadRequestException } from '~/globals/middlewares/error.middleware'
import { IWishDelete, IWishListCreate } from './../../features/wishList/interfaces/wishLists.interface'
import { prisma } from './../../prisma'
class WishListsService {
  public async add(wishListCreate: IWishListCreate) {
    try {
      const wish = await prisma.wishlist.create({
        data: wishListCreate
      })
    } catch (error) {}
  }
  public async read(id: number) {
    const wishlist = await prisma.user.findFirst({
      where: {
        id
      },
      include: {
        wishList: {
          include: {
            product: true
          }
        }
      }
    })

    return wishlist
  }
  public async delete(WishDelete: IWishDelete) {
    console.log(WishDelete)
    // process.exit(1)

    try {
      const wish = await prisma.wishlist.delete({
        where: WishDelete
      })
      return wish
    } catch (error) {
      throw new BadRequestException('something wrong')
    }
  }
}

export const wishListsService: WishListsService = new WishListsService()
