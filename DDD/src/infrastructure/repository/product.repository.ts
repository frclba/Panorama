
import Product from "../../domain/entity/product/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";

// prisma client
import { PrismaClient } from "@prisma/client";
import PrismaRepository from "./PrismaRepository";

export default class ProductRepository extends PrismaRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        const response = await this.prisma.product.create({
            data: {
                id: entity.id,
                name: entity.name,
                price: entity.price
            }
        });
        console.log('response',response);
        
    }
    async update(entity: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}