import { describe, test, expect } from "bun:test";
import OrderItem from "./orderItem";

describe("OrderItem", () => {
    test("should throw error if productID is empty", () => {
        expect(() => {
            let order = new OrderItem(1, "", "123", 1, 100);
        }).toThrow("ProductID is required");
    })
    test("should throw error if name is empty", () => {
        expect(() => {
            let order = new OrderItem(2, "1", "", 1, 100);
        }).toThrow("Name is required");
    })
    test("should throw error if quantity is less than 0", () => {
        expect(() => {
            let order = new OrderItem(3, "123", "123", -1, 1);
        }).toThrow("Quantity must be greater than zero");
    })
    test("should throw error if price is less than 0", () => {
        expect(() => {
            let order = new OrderItem(4, "123", "123", 1, -1);
        }).toThrow("Price must be greater than zero");
    })
    test("Should calculate order total", () => {
        const item1 = new OrderItem(5, "i1", "Item 1", 3, 100);
        const orderTotal = item1.orderItemTotal();
        expect(orderTotal).toBe(300);
    })

})