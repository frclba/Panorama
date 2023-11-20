import { describe, expect, test } from "bun:test";
import OrderItem from "../entity/orderItem/orderItem";
import Order from "../entity/order/order";
import OrderService from "./order.service";
import Customer from "../entity/customer/customer";

describe("OrderService", () => {
    test("should place an order", () => {
        const customer = new Customer("c1", "Customer 1", "john@doe.com");        
        const item1 = new OrderItem("1", "Product 1", 1, 100);
        const item2 = new OrderItem("2", "Product 1", 2, 200);
        const order = OrderService.placeOrder(customer, [item1, item2]);

        expect(customer.rewardPoints).toBe(250)
        expect(order.total()).toBe(500);
    })

    test("should sum up the total of every order", () => {
        const item1 = new OrderItem("1", "Product 1", 1, 100);
        const item2 = new OrderItem("2", "Product 1", 2, 200);

        const order1 = new Order("o1","c1", [item1]);
        const order2 = new Order("o2","c1", [item2]);
        
        const total = OrderService.total([order1, order2]);
        expect(total).toBe(500);
    });
    }
);