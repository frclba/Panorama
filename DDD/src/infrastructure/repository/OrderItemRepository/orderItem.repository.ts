import OrderItem from "../../../domain/entity/orderItem/orderItem";
import OrderItemRepositoryInterface from "../../../domain/repository/orderItem.repository.interface";
import PrismaRepository from "../PrismaRepository";

export default class OrderItemRepository extends PrismaRepository implements OrderItemRepositoryInterface {
    async create(entity: OrderItem): Promise<void> {
        await this.prisma.orderItem.create({
            data: {
                id: entity.id,
                orderId: entity.orderId,
                productId: entity.productId,
                name: entity.name,
                quantity: entity.quantity,
                price: entity.price,
            }
        });
    }
    async createAndGetId(entity: OrderItem): Promise<number>{
        const response = await this.prisma.orderItem.create({
            data: {
                id: entity.id,
                orderId: entity.orderId,
                productId: entity.productId,
                name: entity.name,
                quantity: entity.quantity,
                price: entity.price,
            }
        });
        return response.id;
    }
    async update(entity: OrderItem): Promise<void> {
       await this.prisma.orderItem.update({
            where: {id: entity.id},
            data: {
                name: entity.name,
                quantity: entity.quantity,
                price: entity.price
            }
        });
    }
    async findById(id: string): Promise<OrderItem> {
        // const orderItem = await this.prisma.orderItem.findUnique({
        //         where: {id: Number(id)},
        // });
        // if (!orderItem) throw new Error("OrderItem not found");
        // const newOrderItem = new OrderItem(orderItem.productId, orderItem.name, orderItem.quantity, orderItem.price);
        // return newOrderItem;
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<OrderItem[]> {
        // const orderItems = await this.prisma.orderItem.findMany();
        // if (orderItems.length > 0) {
        //     return orderItems.map(orderItem => {
        //         const orderItemModel = new OrderItem(orderItem.productId, orderItem.name, orderItem.quantity, orderItem.price);
        //         return orderItemModel;
        //     });
        // }
        // else
         throw new Error("OrderItems not found");
    }
}