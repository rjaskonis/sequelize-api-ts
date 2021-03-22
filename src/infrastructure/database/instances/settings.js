const environments = {
    development: {
        dialect: "sqlite",
        storage: "src/development.db",
    },
    test: {
        dialect: "sqlite",
        storage: "test/my.db",
    },
    production: {
        dialect: "sqlite",
        storage: "database/production.db",
        logging: false,
    },
};

module.exports = environments[process.env.NODE_ENV || "test"];
