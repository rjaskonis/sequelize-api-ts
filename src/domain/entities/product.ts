import { Entity } from "@domain/entity";

export default class Product implements Entity {
    public id: Number;
    public _deleted?: boolean;

    constructor(
        public title: string,
        public description: string,
        public price: number,
        public manufacturer: string,
        public inventory: number,
        public photo?: Buffer | undefined
    ) {}
}
