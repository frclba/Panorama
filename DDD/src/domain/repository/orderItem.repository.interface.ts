import OrderItem from "../entity/orderItem/orderItem";
import RepositoryInterface from "./repository-interface";

export default interface OrderItemRepositoryInterface 
extends RepositoryInterface<OrderItem> {
    createAndGetId(entity: OrderItem): Promise<number> | undefined;
}