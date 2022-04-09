import dotenv from "dotenv";
dotenv.config();

export const config = {
    databaseHost: process.env.DB_HOSTNAME,
    databaseName: process.env.DB_DB_NAME,
    databaseUser: process.env.DB_USERNAME,
    databasePassword: process.env.DB_PASSWORD,
};
