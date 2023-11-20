import Address from "../address/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _email: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string, email: string) {
        this._id = id;
        this._name = name;
        this._email = email;
        this.validate();
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
    }

}