
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedInterface from "../customer-create.event";

export default class FirstLogWhenCustomerIsCreated implements EventHandlerInterface<CustomerCreatedInterface> {

    handle(event: CustomerCreatedInterface): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }
}