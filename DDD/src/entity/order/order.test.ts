import {describe, expect, test } from "bun:test";
import Order from "./order";
import OrderItem from "../orderItem/orderItem";

describe("Order", () => {
    test("should throw error if ID is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrow("ID is required");
    })
    test("should throw error if customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrow("CustomerID is required");
    })
    test("should throw error if customerId is empty", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrow("Item quantity must be greater than zero");
    })
    test("Should calculate total", () => {
        const item1 = new OrderItem("i1", "Item 1", 100);
        const item2 = new OrderItem("i2", "Item 1", 200);
        const order = new Order("123", "123", [item1, item2]);
        const orderTotal = order.total();
        expect(orderTotal).toBe(300);
    })
})