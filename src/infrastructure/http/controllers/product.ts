import { Request, Response } from "express";
import Product from "@domain/entities/product";
import ProductInteractor from "@domain/usecases/product.interactor";
import SequelizeAdapter from "@data/adapters/sequelize";

let interactor: ProductInteractor;

export async function findProducts(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Product"]);

    interactor = interactor || new ProductInteractor(repository);

    const { limit, offset } = req.query;

    const products = await interactor.findAll({ limit, offset });

    return res.json(products);
}

export async function findProductById(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Product"]);

    interactor = interactor || new ProductInteractor(repository);

    const product = await interactor.findOne({ where: { id: req.params.id } });

    return res.json(product);
}

export async function createProduct(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Product"]);

    interactor = interactor || new ProductInteractor(repository);

    const product = req.body;

    try {
        const createdProduct = await interactor.store(
            new Product(product.title, product.description, product.price, product.manufacturer, product.inventory, product.photo)
        );

        return res.status(201).json(createdProduct);
    } catch (err) {
        return res.sendStatus(400);
    }
}

export async function updateProduct(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Product"]);

    interactor = interactor || new ProductInteractor(repository);

    try {
        const registeredProduct = await interactor.findOne({ where: { id: req.params.id } });

        if (!registeredProduct) return res.status(400).send(`Product ${req.params.id} not registered`);

        const product = req.body;

        await interactor.store({ ...registeredProduct, ...product });

        return res.sendStatus(204);
    } catch (err) {
        return res.sendStatus(400);
    }
}

export async function deleteProduct(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Product"]);

    interactor = interactor || new ProductInteractor(repository);

    try {
        const registeredProduct = await interactor.findOne({ where: { id: req.params.id } });

        if (!registeredProduct) return res.status(400).send(`Product ${req.params.id} not registered`);

        await interactor.delete({ where: { id: registeredProduct.id } });

        return res.sendStatus(200);
    } catch (err) {
        console.log(err);

        return res.sendStatus(400);
    }
}
