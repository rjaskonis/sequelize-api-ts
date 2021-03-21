import { Request, Response } from "express";
import Order from "@domain/entities/order";
import OrderInteractor from "@domain/usecases/order.interactor";
import SequelizeAdapter from "@data/adapters/sequelize";

let interactor: OrderInteractor;

export async function findOrders(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Order"]);

    interactor = interactor || new OrderInteractor(repository);

    const { limit, offset, expand = false } = req.query;

    const include = expand ? { model: database["Product"], as: "products" } : null;

    const orders = await interactor.findAll({ limit, offset, include });

    return res.json(orders);
}

export async function findOrderById(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Order"]);

    interactor = interactor || new OrderInteractor(repository);

    const order = await interactor.findOne({ where: { id: req.params.id }, include: { model: database["Product"], as: "products" } });

    return res.json(order);
}

export async function createOrder(req: Request, res: Response) {
    const database = req.app.get("DATABASE");
    const repository = new SequelizeAdapter(database["Order"]);

    interactor = interactor || new OrderInteractor(repository);

    const order = req.body;

    try {
        const createdOrder = await interactor.store(new Order([]));

        return res.status(201).json(createdOrder);
    } catch (err) {
        return res.sendStatus(400);
    }
}
