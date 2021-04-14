import { Sequelize } from "sequelize-typescript";
import dbConfig from "@/config/db.config";
import { Dialect } from "sequelize/types";
import { User } from "./user.model";

const sequelize = new Sequelize({
    host: dbConfig.HOST,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    dialect: dbConfig.dialect as Dialect,
    storage: ":memory:",
    pool: dbConfig.pool,
    models: [User],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('model')) === member.toLowerCase();
    }
});

export default sequelize;