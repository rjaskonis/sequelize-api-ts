import { DataTypes } from "sequelize";
import SchemaModel from "@infrastructure/database/schema/model";

const tableName = "products";
const modelName = tableName;

const structure = {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    manufacturer: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    inventory: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    photo: {
        type: DataTypes.BLOB("medium"),
        allowNull: true,
    },
};

const schemaModel: SchemaModel = new SchemaModel(modelName, tableName, structure);

export default schemaModel;
