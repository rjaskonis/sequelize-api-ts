"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("orders", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            datetime: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            totalprice: {
                type: Sequelize.DECIMAL(20, 2),
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
        await queryInterface.dropTable("orders");
    },
};
