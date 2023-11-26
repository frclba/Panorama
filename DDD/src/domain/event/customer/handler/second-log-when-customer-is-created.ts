
import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedInterface from "../customer-create.event";

export default class SecondLogWhenCustomerIsCreated implements EventHandlerInterface<CustomerCreatedInterface> {

    handle(event: CustomerCreatedInterface): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }
}