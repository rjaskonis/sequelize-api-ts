import { Sequelize, DataTypes, ModelCtor, Model } from "sequelize";

export default class SchemaModel {
    constructor(private modelName: string, private tableName: string, private structure: object) {}

    bind(sequelize: Sequelize): ModelCtor<Model<object, object>> {
        const Model = sequelize.define(
            this.modelName,
            {
                ...this.structure,
                _deleted: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: false,
                },
            },
            {
                tableName: this.tableName,
                timestamps: false,
            }
        );

        Model.prototype.delete = function () {
            return this.update({ _deleted: true });
        };

        Model.prototype.undelete = function () {
            return this.update({ _deleted: false });
        };

        return Model;
    }
}
