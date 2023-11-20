import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import {PrismaClient} from "@prisma/client";
import Customer from "../../../domain/entity/Customer/Customer";
import CustomerRepository from "./customer.repository";

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
       
    });

    test("should update a Customer", async () => {
       
    });

    test("should find a Customer by id", async () => {
       
    });

    test("should find all Customers", async () => {
      
    });
});