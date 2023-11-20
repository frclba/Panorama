import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import {PrismaClient} from "@prisma/client";
import Product from "../../domain/entity/product/product";
import ProductRepository from "./product.repository";

describe("product repository test", async () => {
    let prisma: PrismaClient; 
    beforeAll(async () => {
        prisma = new PrismaClient();
        await prisma.$connect();
    });
    afterAll(async () => {
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
    });

    test("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("2", "Product 1", 10);

        await productRepository.create(product);

        const productModel = await prisma.product.findUnique({
            where: {id: "2"}
        });
        expect(productModel).toStrictEqual({
            id: "2",
            name: "Product 1",
            price: 10
        });
        product.changeName("Product 2");
        product.changePrice(20);
        await productRepository.update(product);
        const productModel2 = await prisma.product.findUnique({
            where: {id: "2"}
        });
        expect(productModel2).toStrictEqual({
            id: "2",
            name: "Product 2",
            price: 20
        });
    });

    test("should find a product by id", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("3", "Product 1", 10);
        await productRepository.create(product);
        const productModel = await prisma.product.findUnique({
            where: {id: "3"}
        });
        const foundProduct = await productRepository.findById("3");
        expect(productModel).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price
        });
    });

    test("should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("4", "Product 1", 10);
        await productRepository.create(product);
        const product2 = new Product("5", "Product 2", 20);
        await productRepository.create(product2);
        const productModel = await prisma.product.findMany();
        const expectedProducts = productModel.map(product => new Product(product.id, product.name, product.price));
        const foundProducts = await productRepository.findAll();
        expect(expectedProducts).toEqual(foundProducts)
    });
});