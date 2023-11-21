import Address from "../../../domain/entity/address/address";
import Order from "../../../domain/entity/order/order";
import OrderRepositoryInterface from "../../../domain/repository/order.repository.interface";
import PrismaRepository from "../PrismaRepository";

export default class OrderRepository extends PrismaRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await this.prisma.order.create({
            data: {
                id: entity.id,
                customerId: entity.customerId,
                total: entity.total(),
                items: {
                    create: entity.items.map(item => ({
                        id: item.id,
                        productId: item.productId,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    }))
                },
            }
        });
    }
    
    async update(entity: Order): Promise<void> {
       await this.prisma.order.update({
            where: {id: entity.id},
            data: {
               
            }
        });
    }
    async findById(id: string): Promise<Order> {
        // try {
        //     const order = await this.prisma.order.findUniqueOrThrow({
        //           where: {id: id},
        //     });
        //     const newOrder = new Order(order.id, order.customerId, order.items);
        //     return newOrder;
        // }
        // catch(error) {
            throw new Error("Order not found");
        // }
    }

    async findAll(): Promise<Order[]> {
        // const orders = await this.prisma.order.findMany();
        // if (orders.length > 0) {
        //     return orders.map(order => {
        //         const orderModel = new Order(order.id, order.customerId, order.items);
        //         return orderModel;
        //     });
        // }
        // else 
        throw new Error("Orders not found");
    }
}