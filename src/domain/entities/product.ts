import { Entity } from "@domain/entity";

export default class Product implements Entity {
    public id: Number;

    constructor(
        public description: string,
        public price: number,
        public title: string,
        public manufacturer: string,
        public inventory: number,
        public photo?: Buffer | any
    ) {}
}
