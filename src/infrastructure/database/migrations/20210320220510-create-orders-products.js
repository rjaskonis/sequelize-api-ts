"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("orders_products", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            order_id: {
                type: Sequelize.NUMBER,
                allowNull: false,
                references: {
                    model: "orders",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            product_id: {
                type: Sequelize.NUMBER,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            _deleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("orders_products");
    },
};
