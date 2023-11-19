export default class OrderItem {
    _productId: string;
    _quantity: number;
    _price: number;
    constructor(productId: string, quantity: number, price: number) {
        this._productId = productId;
        this._quantity = quantity;
        this._price = price;
    }
    get productId() {
        return this._productId;
    }
    get quantity() {
        return this._quantity;
    }
    get price() {
        return this._price;
    }
}