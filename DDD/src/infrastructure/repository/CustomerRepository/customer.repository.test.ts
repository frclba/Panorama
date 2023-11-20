import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import {PrismaClient} from "@prisma/client";
import Customer from "../../../domain/entity/customer/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../domain/entity/address/address";
import exp from "constants";

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
        const customerRepository = new CustomerRepository();
        const customerModel = new Customer("5", "Customer 5", "unique@test.com")
        customerModel.changeAddress(new Address("Street 5", "City 5", "State 5", "Zip 5", "Country 5"));
        await customerRepository.create(customerModel);
        const customerSearch = await customerRepository.findById("5");
        expect(customerModel).toEqual(customerSearch);
    });

    test("should find all Customers", async () => {
        const customerRepository = new CustomerRepository();
        const customersPrisma = await prisma.customer.findMany();
        const customers = await customerRepository.findAll();
        const customersExpected = customersPrisma.map(customer => {
            const address = new Address(customer.street, customer.city, customer.state, customer.zip, customer.country);
            const customerModel = new Customer(customer.id, customer.name, customer.email);
            customerModel.changeAddress(address);
            return customerModel;
        });
        expect(customers).toEqual(customersExpected);
    });
});