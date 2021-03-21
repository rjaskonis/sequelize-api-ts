import { Entity } from "@domain/entity";
import Product from "./product";

export default class Order implements Entity {
    public id: Number;
    public datetime: Date;
    private totalprice: number;

    constructor(public products: Array<Product>) {
        this.datetime = new Date();
        this.totalprice = this.products.length ? this.products.map((p) => p.price).reduce((a, b) => a + b) : 0;
    }

    public getTotalPrice(): number {
        return this.totalprice;
    }
}
