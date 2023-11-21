// import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
// import {PrismaClient} from "@prisma/client";
// import OrderItem from "../../../domain/entity/orderItem/orderItem";
// import OrderItemRepository from "./orderItem.repository";

// describe("OrderItem repository test", async () => {
//     let prisma: PrismaClient;

//     beforeAll(async () => {
//         prisma = new PrismaClient();
//         await prisma.$connect();
//     });
//     afterAll(async () => {
//         await prisma.$disconnect();
//     });

//     test("should create a OrderItem", async () => {
//         const orderItemRepository = new OrderItemRepository();
//         const orderItem = new OrderItem("1", "OrderItem 1", 1, 100);
//         const idCreated = await orderItemRepository.createAndGetId(orderItem);      
//         const orderItemCreated = await prisma.orderItem.findUnique({
//             where: {id: idCreated}
//         });
//         expect(orderItemCreated).toEqual(orderItemCreated)
//     });

//     test("should throw en error when orderItem is not found", async () => {
//        const orderItemRepository = new OrderItemRepository();

//        expect(async () => {
//         const orderItem = await orderItemRepository.findById("31321312")
//        }).toThrow("OrderItem not found");
//     });

//     test("should find a OrderItem by id", async () => {
//         const orderItemRepository = new OrderItemRepository();
//         const orderItemModel = new OrderItem("1", "OrderItem 1", 1, 100)
//         const orderItemSearch = await orderItemRepository.findById("1");
//         expect(orderItemModel).toEqual(orderItemSearch);
//     });

//     test("should find all OrderItems", async () => {
//         const orderItemRepository = new OrderItemRepository();
//         const orderItemsPrisma = await prisma.orderItem.findMany();
//         const orderItems = await orderItemRepository.findAll();
//         const orderItemsExpected = orderItemsPrisma.map(orderItem => {
//             const orderItemModel = new OrderItem(orderItem.productId, orderItem.name, orderItem.quantity, orderItem.price);
//             return orderItemModel;
//         });
//         expect(orderItems).toEqual(orderItemsExpected);
//     });
// });