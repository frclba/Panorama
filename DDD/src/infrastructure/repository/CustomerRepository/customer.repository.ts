import Address from "../../../domain/entity/address/address";
import Customer from "../../../domain/entity/customer/customer";
import CustomerRepositoryInterface from "../../../domain/repository/customer.repository.interface";
import PrismaRepository from "../PrismaRepository";

export default class CustomerRepository extends PrismaRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await this.prisma.customer.create({
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
       await this.prisma.customer.update({
            where: {id: entity.id},
            data: {
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
    async findById(id: string): Promise<Customer> {
        try {
            const customer = await this.prisma.customer.findUniqueOrThrow({
                  where: {id: id},
            });
            const newCustomer = new Customer(customer.id, customer.name, customer.email);
            newCustomer.changeAddress(new Address(customer.street, customer.city, customer.state, customer.zip, customer.country));
            return newCustomer;
        }
        catch(error) {
            throw new Error("Customer not found");
        }
    }

    async findAll(): Promise<Customer[]> {
      throw new Error("Method not implemented.");
    }
}