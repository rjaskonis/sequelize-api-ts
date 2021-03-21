import request from "supertest";
import app from "@http/application";
import Product from "@domain/entities/product";
import ProductInteractor from "@domain/usecases/product.interactor";
import Order from "@domain/entities/order";
import OrderInteractor from "@domain/usecases/order.interactor";
import SequelizeAdapter from "@data/adapters/sequelize";

describe("Order endpoints", () => {
    const database = app.get("DATABASE");
    const productRepository: SequelizeAdapter = new SequelizeAdapter(database["Product"]);
    const productInteractor: ProductInteractor = new ProductInteractor(productRepository);
    const orderRepository: SequelizeAdapter = new SequelizeAdapter(database["Order"]);
    const orderInteractor: OrderInteractor = new OrderInteractor(orderRepository);

    it("should get all orders - GET /api/orders - success", async () => {
        const createdProduct1 = await productInteractor.store(new Product("Banana", "Yellow fruit", 1, "Nature", 10));
        const createdProduct2 = await productInteractor.store(new Product("Apple", "Red fruit", 1, "Nature", 5));
        const createdProduct3 = await productInteractor.store(new Product("Grape", "Purple fruit", 1, "Nature", 8));

        const order = new Order([createdProduct1, createdProduct2, createdProduct3]);

        await orderInteractor.store(new Order([createdProduct1]));
        await orderInteractor.store(new Order([createdProduct1, createdProduct2]));
        await orderInteractor.store(new Order([createdProduct2, createdProduct3]));

        const { status, body } = await request(app).get("/api/orders").query({ expand: true });

        expect(status).toBe(200);
        expect(body.length).toBe(3);
    });

    it("should get only last 2 orders - GET /api/orders - success", async () => {
        const { status, body } = await request(app).get("/api/orders").query({ limit: 2, offset: 1 });

        expect(status).toBe(200);
        expect(body.length).toBe(2);
    });

    it("should get only order identified by ID 2 - GET /api/orders/2 - success", async () => {
        const { status, body } = await request(app).get("/api/orders/2");

        expect(status).toBe(200);
        expect(body.products.length).toBe(2);
    });
});
