import { DataTypes, ModelCtor, Model, Sequelize } from "sequelize";
import SchemaModel from "@infrastructure/database/schema/model";

const modelName = "OrderProduct";
const tableName = "orders_products";

const structure = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    _deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
    },
};

// const associate = (sequelize: Sequelize, Model: ModelCtor<Model<object, object>>) => {
//     Model.belongsTo(sequelize.model("orders"), { foreignKey: "order_id" });
//     Model.belongsTo(sequelize.model("products"), { foreignKey: "product_id" });
// };

function associate(db: any): void {
    const Product: ModelCtor<Model<object, object>> = db["Product"];
    const Order: ModelCtor<Model<object, object>> = db["Order"];
    const OrderProduct: ModelCtor<Model<object, object>> = db["OrderProduct"];

    OrderProduct.belongsTo(Order, { foreignKey: "order_id" });
    OrderProduct.belongsTo(Product, { foreignKey: "product_id" });
}

const schemaModel: SchemaModel = new SchemaModel(modelName, tableName, structure, associate);

export default schemaModel;
