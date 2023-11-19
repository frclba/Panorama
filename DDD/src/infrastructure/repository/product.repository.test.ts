import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import {PrismaClient} from "@prisma/client";
import Product from "../../domain/entity/product/product";
import ProductRepository from "./product.repository";

describe("product repository test", async () => {
    let prisma: PrismaClient; 
    beforeEach(async () => {
        prisma = new PrismaClient();
        await prisma.$connect();
    });
    afterEach(async () => {
        await prisma.$disconnect();
    });

    test("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        await productRepository.create(product);

        const productModel = await prisma.product.findUnique({
            where: {id: "1"}
        });
        expect(productModel).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 10
          });
    })
});