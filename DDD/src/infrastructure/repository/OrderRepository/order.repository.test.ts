import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import {PrismaClient} from "@prisma/client";
import Order from "../../../domain/entity/order/order";
import OrderRepository from "./order.repository";
import CustomerRepository from "../CustomerRepository/customer.repository";
import Product from "../../../domain/entity/product/product";
import ProductRepository from "../ProductRepository/product.repository";
import OrderItem from "../../../domain/entity/orderItem/orderItem";

describe("Order repository test", async () => {
    let prisma: PrismaClient; 
    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.$connect();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    test("should create a Order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = await customerRepository.findById("1");
        const productRepository = new ProductRepository();
        const product = await productRepository.findById("1");
        const orderItem = new OrderItem(
            1,
            product.id,
            product.name,
            2,
            product.price,
        )
        const order = new Order(
            "1",
            customer.id,
            [orderItem]
        )
        const orderRepository = new OrderRepository();
        await orderRepository.create(order)
        const orderModel = await prisma.order.findUnique({
            where: {id: order.id},
            include: {
                items: true
            }
        });
        
        expect(orderModel).toStrictEqual({
            id: "1",
            customerId: "1",
            total: order.total(),
            items: [{
                id: 1,
                orderId: "1",
                productId: orderItem.productId,
                name: orderItem.name,
                quantity: orderItem.quantity,
                price: orderItem.price,
            }]
        })
    });
});