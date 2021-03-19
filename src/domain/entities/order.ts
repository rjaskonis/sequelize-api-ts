import { Entity } from "@domain/entity";
import Product from "./product";

export default class Order implements Entity {
    private totalPrice: number;

    public id: Number;
    public dateTime: Date;

    constructor(public products: Array<Product>) {
        this.dateTime = new Date();
    }

    getTotalPrice(): number {
        return this.products.map((p) => p.price).reduce((a, b) => a + b);
    }
}
