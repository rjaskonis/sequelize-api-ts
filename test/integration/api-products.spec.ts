import request from "supertest";
import { Sequelize } from "sequelize";
import app from "@http/application";
import Product from "@domain/entities/product";
import ProductInteractor from "@domain/usecases/product.interactor";
import SequelizeAdapter from "@data/adapters/sequelize";
import databaseSettings from "@infrastructure/database/instances/settings";
import productSchemaModel from "@infrastructure/database/schema/models/product";

describe("Product endpoints", () => {
    const databaseConnection = new Sequelize(databaseSettings);
    const repository: SequelizeAdapter = new SequelizeAdapter(databaseConnection, productSchemaModel);
    const interactor: ProductInteractor = new ProductInteractor(repository);

    it("should get all products - GET /api/products - success", async () => {
        await interactor.store(new Product("Banana", "Yellow fruit", 1, "Nature", 10));
        await interactor.store(new Product("Apple", "Red fruit", 1, "Nature", 5));
        await interactor.store(new Product("Grape", "Purple fruit", 1, "Nature", 8));

        const { status, body } = await request(app).get("/api/products");

        expect(status).toBe(200);
        expect(body).toEqual([
            { _deleted: 0, id: 1, title: "Banana", description: "Yellow fruit", price: 1, manufacturer: "Nature", inventory: 10, photo: null },
            { _deleted: 0, id: 2, title: "Apple", description: "Red fruit", price: 1, manufacturer: "Nature", inventory: 5, photo: null },
            { _deleted: 0, id: 3, title: "Grape", description: "Purple fruit", price: 1, manufacturer: "Nature", inventory: 8, photo: null },
        ]);
    });

    it("should get only last 2 products - GET /api/products - success", async () => {
        const { status, body } = await request(app).get("/api/products").query({ limit: 2, offset: 1 });

        expect(status).toBe(200);
        expect(body).toEqual([
            { _deleted: 0, id: 2, title: "Apple", description: "Red fruit", price: 1, manufacturer: "Nature", inventory: 5, photo: null },
            { _deleted: 0, id: 3, title: "Grape", description: "Purple fruit", price: 1, manufacturer: "Nature", inventory: 8, photo: null },
        ]);
    });

    it("should get only product identified by ID 2 - GET /api/products/2 - success", async () => {
        const { status, body } = await request(app).get("/api/products/2");

        expect(status).toBe(200);
        expect(body).toEqual({
            _deleted: 0,
            id: 2,
            title: "Apple",
            description: "Red fruit",
            price: 1,
            manufacturer: "Nature",
            inventory: 5,
            photo: null,
        });
    });

    it("should create a product - POST /api/products - success", async () => {
        const { status, body } = await request(app).post("/api/products").send({
            title: "Orange",
            description: "Orange fruit",
            price: 1.2,
            manufacturer: "Nature",
            inventory: 15,
        });

        expect(status).toBe(201);
        expect(body).toHaveProperty("title");
    });

    it("should update product identified by ID 3 - PUT /api/products/3 - success", async () => {
        const { status, body } = await request(app).put("/api/products/3").send({
            title: "Torange",
            description: "Very orange fruit",
            price: 1.4,
            manufacturer: "Nature",
            inventory: 25,
        });

        expect(status).toBe(204);
    });

    it("should delete product identified by ID 2 - DELETE /api/products/2 - success", async () => {
        const { status } = await request(app).delete("/api/products/2");

        expect(status).toBe(200);
    });
});
