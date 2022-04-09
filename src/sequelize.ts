import { Sequelize } from "sequelize-typescript";
import { config } from "./config";
import * as models from "./models"

const sequelizeInstance = new Sequelize(
    {
        database: config.databaseName,
        dialect: "mysql",
        logging: console.log,
        host: config.databaseHost,
        models: Object.values(models),
        password: config.databasePassword,
        username: config.databaseUser,
    },
);

export default sequelizeInstance
