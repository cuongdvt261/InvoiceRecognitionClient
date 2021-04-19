import { Sequelize } from "sequelize-typescript";
import dbConfig from "@/config/db.config";
import { Dialect } from "sequelize/types";
import { User } from "./user.model";
import { Recognite } from "./recognite.model";

const sequelize = new Sequelize({
    host: dbConfig.HOST,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    dialect: dbConfig.dialect as Dialect,
    storage: ":memory:",
    pool: dbConfig.pool,
    models: [User, Recognite],
    logging: false
});

export default sequelize;