import Repository from "@data/repository";
import SchemaModel from "@infrastructure/database/schema/model";
import { Sequelize, ModelCtor, Model } from "sequelize";
import { Entity } from "@domain/entity";
import { Interactor } from "@domain/interactor";

export default class SequelizeAdapter implements Repository {
    model: ModelCtor<Model<object, object>>;

    constructor(private readonly connection: Sequelize, private schemaModel: SchemaModel) {
        this.model = schemaModel.bind(connection);
    }

    execute: (command: string) => Promise<void>;

    query?: (command: string) => Promise<any>;

    async findAll(param: object = {}): Promise<Array<any>> {
        return this.model.findAll({ ...param, raw: true });
    }

    async findOne(param: any): Promise<any> {
        return this.model.findOne({ ...param, raw: true });
    }

    async create(data: Entity): Promise<object> {
        return this.model.create(data);
    }

    async update(data: Entity | Interactor.Data, param: any): Promise<object> {
        return this.model.update(data, param);
    }

    async delete(param: any): Promise<any> {
        return this.model.destroy(param);
    }
}
