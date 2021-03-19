"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("products", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            description: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(20, 2),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            manufacturer: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            inventory: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            photo: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("products");
    },
};
