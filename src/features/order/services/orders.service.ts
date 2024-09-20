import { prisma } from "~/prisma"

class OrdersService {
    public async get (id : number){
        const userWithOrders = await prisma.user.findFirst({
            where : {
                id
            },
            include : {
                order : true
            }
        })
        return userWithOrders
    }
    
}

export const ordersService: OrdersService = new OrdersService()
