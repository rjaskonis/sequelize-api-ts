import { DataTypes, ModelCtor, Model, Sequelize } from "sequelize";
import SchemaModel from "@infrastructure/database/schema/model";

const modelName = "Order";
const tableName = "orders";

const structure = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalprice: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: true,
    },
    _deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
};

function associate(db: any): void {
    const Order: ModelCtor<Model<object, object>> | any = db["Order"];
    const Product: ModelCtor<Model<object, object>> = db["Product"];
    const OrderProduct: ModelCtor<Model<object, object>> = db["OrderProduct"];

    Order.Products = Order.belongsToMany(Product, {
        through: OrderProduct,
        as: "products",
        foreignKey: "order_id",
        otherKey: "product_id",
    });
}

const schemaModel: SchemaModel = new SchemaModel(modelName, tableName, structure, associate);

export default schemaModel;
