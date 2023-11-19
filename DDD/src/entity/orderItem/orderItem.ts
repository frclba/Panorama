export default class OrderItem {
    private _productId: string;
    private _name: string;
    private _quantity: number;
    private _price: number;
    constructor(productId: string, name: string, quantity: number, price: number) {
        this._productId = productId;
        this._name = name;
        this._quantity = quantity;
        this._price = price;
        this.validate();
    }

    validate() {
        if (this._productId === "") {
            throw new Error("ProductID is required");
        }
        if (this._name === "") {
            throw new Error("Name is required");
        }
        if (this._quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
        if (this._price <= 0) {
            throw new Error("Price must be greater than zero");
        }

    }

    get quantity(): number {
        return this._quantity;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
}