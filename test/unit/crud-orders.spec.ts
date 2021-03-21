import { Sequelize } from "sequelize";
import Product from "@domain/entities/product";
import ProductInteractor from "@domain/usecases/product.interactor";
import Order from "@domain/entities/order";
import OrderInteractor from "@domain/usecases/order.interactor";
import SequelizeAdapter from "@data/adapters/sequelize";
import databaseSettings from "@infrastructure/database/instances/settings";
import { bindModels } from "@infrastructure/database/schema";

describe("Order creation in database", () => {
    const databaseConnection = new Sequelize(databaseSettings);
    const database = bindModels(databaseConnection);

    const productRepository: SequelizeAdapter = new SequelizeAdapter(database["Product"]);
    const productInteractor: ProductInteractor = new ProductInteractor(productRepository);
    const orderRepository: SequelizeAdapter = new SequelizeAdapter(database["Order"]);
    const orderInteractor: OrderInteractor = new OrderInteractor(orderRepository);

    it("should create a simple order with no products", async () => {
        const order = new Order([]);
        const createdOrder = await orderInteractor.store(order);

        expect(createdOrder.id).toBe(1);
    });

    it("should create a order with 2 products", async () => {
        const createdProduct1: Product = await productInteractor.store(
            new Product("Banana", "Yellow fruit", 2.5, "Nature", 10, Buffer.from([0x00, 0xff]))
        );

        const createdProduct2: Product = await productInteractor.store(
            new Product("Apple", "Red fruit", 1.25, "Nature", 10, Buffer.from([0x00, 0xff]))
        );

        const order = new Order([createdProduct1, createdProduct2]);
        await orderInteractor.store(order);

        // to create all at once
        // const order = await database["Order"].create(
        //     {
        //         datetime: new Date(),
        //         products: [createdProduct],
        //         // products: [
        //         //     new Product("Banana Split", "Yellow fruit", 1, "Nature", 10, Buffer.from([0x00, 0xff])),
        //         //     new Product("Apple", "Red fruit", 1, "Nature", 15, Buffer.from([0x00, 0xff])),
        //         // ],
        //     },
        //     {
        //         include: { model: database["Product"], as: "products", through: database["OrderProduct"] },
        //         subQuery: false,
        //     }
        // );

        const createdOrder: any = await orderInteractor.findOne({
            where: { id: 2 },
            include: { model: database["Product"], as: "products" },
        });

        expect(createdOrder.id).toBe(2);
        expect(createdOrder.products.length).toBe(2);
    });

    it("should find all orders with its products", async () => {
        const order: any = await orderInteractor.findOne({
            where: { id: 1 },
            include: { model: database["Product"], as: "products" },
        });

        expect(order?.id).toBe(1);
    });
});
