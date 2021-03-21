import Interactor from "@domain/interactor";
import Order from "@/domain/entities/order";
import Repository from "@/data/repository";

export default class OrderInteractor implements Interactor {
    constructor(private readonly repository: Repository) {}

    async findAll(param?: object): Promise<Array<Order>> {
        return this.repository.findAll(param);
    }

    async findOne(param: any): Promise<Order | undefined> {
        const Order: Order = await this.repository.findOne(param);

        return Order;
    }

    async store(order: Order): Promise<any> {
        const createdOrder = await this.repository.create(order);

        for (let product of order.products) {
            await createdOrder.addProduct(product.id);
        }

        return createdOrder;
    }
}
