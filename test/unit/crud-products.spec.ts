import { Sequelize, Op } from "sequelize";
import Product from "@domain/entities/product";
import ProductInteractor from "@domain/usecases/product.interactor";
import SequelizeAdapter from "@data/adapters/sequelize";
import databaseSettings from "@infrastructure/database/instances/settings";
import { bindModels } from "@infrastructure/database/schema";

describe("Product creation in database", () => {
    const databaseConnection = new Sequelize(databaseSettings);
    const database = bindModels(databaseConnection);
    const repository: SequelizeAdapter = new SequelizeAdapter(database["Product"]);
    const interactor: ProductInteractor = new ProductInteractor(repository);

    it("should create a product titled 'Banana'", async () => {
        const createdProduct: Product = await interactor.store(new Product("Banana", "Yellow fruit", 1, "Nature", 10, Buffer.from([0x00, 0xff])));

        expect(createdProduct?.title).toBe("Banana");
    });

    it("should delete registered product", async () => {
        await interactor.delete({ where: { id: 1 } });

        const deletedProduct: Product | undefined = await interactor.findOne({ where: { id: 1 } });

        expect(deletedProduct?._deleted).toEqual(1);
    });

    it("should return a list of all registered products", async () => {
        await interactor.store(new Product("Banana", "Yellow fruit", 1, "Nature", 10));

        const maca = await interactor.store(new Product("Apple", "Red fruit", 1, "Nature", 5));

        await interactor.delete({ where: { id: maca.id } });

        const products = await interactor.findAll();

        expect(products.length).toBeGreaterThan(0);
    });

    it("should return a list of all deleted products only", async () => {
        const products = await interactor.findAll({ where: { _deleted: 1 } });

        expect(products.length).toBeGreaterThan(0);
    });

    it("should return a list of all non deleted products only", async () => {
        const products = await interactor.findAll({ where: { _deleted: { [Op.not]: 1 } } });

        expect(products.length).toEqual(1);
    });
});
