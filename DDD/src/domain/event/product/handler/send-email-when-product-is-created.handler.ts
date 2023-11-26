import ProductCreatedEvent from "../product-create.envent";
import EventHandlerInterface from "../../@shared/event-handler.interface";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {

    handle(event: ProductCreatedEvent): void {
        console.log(`SendEmailWhenProductIsCreatedHandler: ${event.eventData.name} was created`);
    }
}