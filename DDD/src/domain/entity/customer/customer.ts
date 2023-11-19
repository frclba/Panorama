import Address from "../address/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }
    get name() {
        return this._name;
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
    
    validate() {
        if (this._id === "") {
            throw new Error("ID is required");
        }
        if (this._name === "") {
            throw new Error("Name is required");
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
    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
    
    set Address(address: Address) {
        this._address = address;
    }

}