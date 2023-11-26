import EventDispatcher from "../../event/@shared/event-dispatcher";
import AddressChangeEvent from "../../event/customer/address-change.event";
import LogWhenAddressIsChanged from "../../event/customer/handler/log-when-address-is-changed";
import CustomerCreatedEvent from "../../event/customer/customer-create.event";
import FirstLogWhenCustomerIsCreated from "../../event/customer/handler/first-log-when-customer-is-created";
import SecondLogWhenCustomerIsCreated from "../../event/customer/handler/second-log-when-customer-is-created";
import Address from "../address/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _email: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;
    eventDispatcher = new EventDispatcher();
    firstEventHandler = new FirstLogWhenCustomerIsCreated();
    secondEventHandler = new SecondLogWhenCustomerIsCreated();
    changeAddressEventHandler = new LogWhenAddressIsChanged();
    
    constructor(id: string, name: string, email: string) {
        this.registerEvents();
        this._id = id;
        this._name = name;
        this._email = email;
        this.validate();
    }
    registerEvents() {
        this.eventDispatcher.register("CustomerCreatedEvent", this.firstEventHandler);
        this.eventDispatcher.register("CustomerCreatedEvent", this.secondEventHandler);
        this.eventDispatcher.register("AddressChangeEvent", this.changeAddressEventHandler);
    }
    notifyCreatedEvent() {
        const customerCreatedEvent = new CustomerCreatedEvent({id: this._id, name: this._name, email: this._email});
        this.eventDispatcher.notify(customerCreatedEvent);
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }

    get isActive() {
        return this._active;
    }
    get rewardPoints() {
        return this._rewardPoints;
    }
    get id() {
        return this._id;
    }
    get address() {
        return this._address;
    }

    
    validate() {
        if (this._id === "") {
            throw new Error("ID is required");
        }
        if (this._name === "") {
            throw new Error("Name is required");
        }
        if (this._email === "") {
            throw new Error("Email is required");
        }
    }

    changeName(newName: string) {
        this._name = newName;
        this.validate();
    }
    
    changeEmail(newEmail: string) {
        this._email = newEmail;
        this.validate();
    }

    activate() {
        if(this._address === undefined){
            throw new Error("Address is required");
        }
        this._active = true;
    }
    
    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
    
    changeAddress(address: Address) {
        this._address = address;
        const values = address.getValues()
        const addressChangeEvent = new AddressChangeEvent({...values})
        this.eventDispatcher.notify(addressChangeEvent);
    }

}