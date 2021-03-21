import { Sequelize, DataTypes, ModelCtor, Model } from "sequelize";

export default class SchemaModel {
    constructor(public modelName: string, private tableName: string, private structure: object, private associate?: (db: any) => void) {}

    bind(sequelize: Sequelize): ModelCtor<Model<object, object>> {
        const Model: any = sequelize.define(
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

        Model.associate = (db: any) => {
            if (this.associate) this.associate(db);
        };

        return Model;
    }
}
