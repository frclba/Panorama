import Customer from "../entity/customer/customer";
import Order from "../entity/order/order";
import OrderItems from "../entity/orderItem/orderItem";
import {v4 as uuid} from "uuid";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.total(), 0);
    };

    static placeOrder(customer: Customer, items: OrderItems[]): Order {
        if(items.length === 0) {
            throw new Error("Items are required");
        }
        const order = new Order(uuid(), customer.id, items);

        customer.addRewardPoints(order.total()/2);
        return order;
    }
}