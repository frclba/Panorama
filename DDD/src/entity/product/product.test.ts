import { describe, test, expect } from "bun:test";
import Product from "./product";


describe("Product", () => {
    test("should throw error if ID is empty", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrow("ID is required");
    })
    test("should throw error if name is empty", () => {
        expect(() => {
            let product = new Product("1", "", 100);
        }).toThrow("Name is required");
    })
    test("should throw error if price greater than ", () => {
        expect(() => {
            let product = new Product("1", "123", -1);
        }).toThrow("Price must be greater than zero");
    })
    test("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2") ;
        expect(product.name).toBe("Product 2");
    })
    test("should change Price", () => {
        const product = new Product("123", "Product 1", 100);
        expect(product.price).toBe(100);
        product.changePrice(150) ;
        expect(product.price).toBe(150);
    })
})