"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("products", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(20, 2),
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
                type: Sequelize.BLOB("medium"),
                allowNull: true,
            },
            _deleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: 0,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("products");
    },
};
