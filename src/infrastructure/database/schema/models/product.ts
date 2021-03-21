import { DataTypes, ModelCtor, Model, Sequelize } from "sequelize";
import SchemaModel from "@infrastructure/database/schema/model";

const modelName = "Product";
const tableName = "products";

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

function associate(db: any): void {
    const Product: ModelCtor<Model<object, object>> = db["Product"];
    const Order: ModelCtor<Model<object, object>> = db["Order"];
    const OrderProduct: ModelCtor<Model<object, object>> = db["OrderProduct"];

    Product.belongsToMany(Order, {
        through: OrderProduct,
        foreignKey: "product_id",
        otherKey: "order_id",
    });
}

const schemaModel: SchemaModel = new SchemaModel(modelName, tableName, structure, associate);

export default schemaModel;
