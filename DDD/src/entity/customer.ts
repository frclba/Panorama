import Address from "./address";

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
    }

    validate() {
        if (this._name === "") {
            throw new Error("Name is required");
        }
        if (this._id === "") {
            throw new Error("ID is required");
        }
    }

    changeName(newName: string) {
        this._name = newName;
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

    set Address(address: Address) {
        this._address = address;
    }


}