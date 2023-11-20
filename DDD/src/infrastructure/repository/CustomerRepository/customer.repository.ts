import Customer from "../../../domain/entity/customer/customer";
import CustomerRepositoryInterface from "../../../domain/repository/customer.repository.interface";
import PrismaRepository from "../PrismaRepository";

export default class CustomerRepository extends PrismaRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        const response = await this.prisma.customer.create({
            data: {
                id: entity.id,
                name: entity.name,
                email: entity.email,
                street: entity.address.street,
                city: entity.address.city,
                state: entity.address.state,
                zip: entity.address.zip,
                country: entity.address.country,
                active: entity.isActive,
                rewardPoints: entity.rewardPoints
            }
        });
    }
    async update(entity: Customer): Promise<void> {
       
    }
    async findById(id: string): Promise<Customer> {
      throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Customer[]> {
      throw new Error("Method not implemented.");
    }
}