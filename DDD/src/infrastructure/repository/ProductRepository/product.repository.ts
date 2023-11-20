
import Product from "../../../domain/entity/product/product";
import ProductRepositoryInterface from "../../../domain/repository/product.repository.interface";

// prisma client
import { PrismaClient } from "@prisma/client";
import PrismaRepository from "../PrismaRepository";

export default class ProductRepository extends PrismaRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        const response = await this.prisma.product.create({
            data: {
                id: entity.id,
                name: entity.name,
                price: entity.price
            }
        });        
    }
    async update(entity: Product): Promise<void> {
        await this.prisma.product.update({
            where: {id: entity.id},
            data: {
                name: entity.name,
                price: entity.price
            }
        });
    }
    async findById(id: string): Promise<Product> {
        const product = await this.prisma.product.findUnique({
            where: { id: id }
        });

        if (product) {
            return new Product(product.id, product.name, product.price);
        } else {
            throw new Error("Product not found.");
        }
    }

    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();
        return products.map(product => new Product(product.id, product.name, product.price));
    }
}