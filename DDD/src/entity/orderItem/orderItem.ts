export default class OrderItem {
    private _productId: string;
    private _name: string;
    private _price: number;
    constructor(productId: string, name: string, price: number) {
        this._productId = productId;
        this._name = name;
        this._price = price;
    }
    get productId() {
        return this._productId;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
}