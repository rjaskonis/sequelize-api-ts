import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";

export function bindModels(sequelize: Sequelize) {
    const modelsPath = path.join(__dirname, "models");
    const db: any = {};

    fs.readdirSync(modelsPath).forEach((file) => {
        const { default: schemaModel } = require(path.join(modelsPath, file));

        db[schemaModel.modelName] = schemaModel.bind(sequelize);
    });

    db.sequelize = sequelize;

    Object.keys(db).forEach((modelName) => db[modelName].associate && db[modelName].associate(db));

    return db;
}
