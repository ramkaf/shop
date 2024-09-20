import { Address, OrderItem, User } from "@prisma/client";

export interface IOrderCreate {
        id: number;
        uniqueString: string;
        discount: number;
        userId: number;
        user?: User | null; // Assuming you have an IUser interface for the User relation
        orderItem: OrderItem[]; // Assuming you have an IOrderItem interface for OrderItem
        recipientName: string;
        recipientLastName: string;
        recipientNumber: string;
        deliveringDate: string; // As you specified this as a String
        ShippingDate: Date;
        ShippingCost: number;
        cartPrice: number;
        servicePrice: number;
        finalPrice: number;
        addressId: number;
        address?: Address; // Assuming you have an IAddress interface for Address
        isPaid: boolean;
        isDelivered: boolean;
        createdAt: Date;
        updatedAt: Date;
      }

export interface IOrderUpdate {}
