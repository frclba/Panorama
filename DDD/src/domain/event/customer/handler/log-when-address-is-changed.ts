
import EventHandlerInterface from "../../@shared/event-handler.interface";
import AddressChange from "../address-change.event";

export default class LogWhenAddressIsChanged implements EventHandlerInterface<AddressChange> {

    handle(event: AddressChange): void {
        console.log(event);
        console.log(`Endereço do cliente: alterado para: {${event.eventData.street}, ${event.eventData.city}, ${event.eventData.state}, ${event.eventData.zip}, ${event.eventData.country}}`);
    }
}