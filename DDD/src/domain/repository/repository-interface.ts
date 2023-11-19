// This interface is used to define the contract for all repositories
// T is for aggregated root entity (e.g. Order, Product, Customer)
export default interface RepositoryInterface<T> {
    create(entity: T): Promise<void>;
    update(entity: T): Promise<void>;
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}