import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import {PrismaClient} from "@prisma/client";
import Customer from "../../../domain/entity/customer/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../domain/entity/address/address";

describe("Customer repository test", async () => {
    let prisma: PrismaClient; 
    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.$connect();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });

    test("should create a Customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1", "john@doe.com");
        const address = new Address("Street 1", "City 1", "State 1", "Zip 1", "Country 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const customerCreated = await prisma.customer.findUnique({
            where: {id: customer.id}
        });
        expect(customerCreated).toEqual(customerCreated)
    });

    test("should throw en error when customer is not found", async () => {
       const customerRepository = new CustomerRepository();

       expect(async () => {
        const customer = await customerRepository.findById("31321312")
       }).toThrow("Customer not found");
    });

    test("should find a Customer by id", async () => {
       
    });

    test("should find all Customers", async () => {
      
    });
});