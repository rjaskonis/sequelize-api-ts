// import helloExpress from "@rjaskonis/express-hello-world";
// helloExpress();
// need to declare this as ts module in some *.d.ts file with: declare module "@rjaskonis/express-hello-world";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

import express, { Application } from "express";
import compression from "compression";
import { productRouter } from "@http/routes";
import databaseSettings from "@infrastructure/database/instances/settings";
import { Sequelize } from "sequelize";

const app: Application = express();
const PORT = process.env.PORT;
const PUBLIC_PATH = path.resolve("public");

app.use(compression({ threshold: 0, filter: () => true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json({ limit: "100mb" }));
app.use(express.static(PUBLIC_PATH));
app.use(productRouter);

const databaseConnection = new Sequelize(databaseSettings);

app.set("PORT", PORT);
app.set("DATABASE_CONNECTION", databaseConnection);
app.set("SUPERSECRET_KEY", process.env.SUPERSECRET_KEY);

export default app;
