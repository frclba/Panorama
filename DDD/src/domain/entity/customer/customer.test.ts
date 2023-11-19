import {describe, expect, test } from "bun:test";
import Customer from "./customer";
import Address from "../address/address";

describe("Customer", () => {
    test("should throw error if ID is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrow("ID is required");
    });
    test("should throw error if NAME is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("Name is required");
    });
    test("should change name", () => {
        // Arrange
        let customer = new Customer("123", "John Doe");
        // Act
        customer.changeName("Jane Doe");
        // Assert
        expect(customer.name).toBe("Jane Doe");
    });
    test("should activate client", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", "State 1", "Zip 1", "Country 1");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive).toBe(true);
    });
    test("should activate client", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", "City 1", "State 1", "Zip 1", "Country 1");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive).toBe(true);
        customer.deactivate();
        expect(customer.isActive).toBe(false);
    });
    test("should throw error when addr is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrow("Address is required")
    });
    test("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(200);
    })
})