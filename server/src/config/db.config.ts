'use strict';

const dbConfig = {
    HOST: "localhost",
    USER: "ligua",
    PASSWORD: "admin_ligua_123",
    DB: "liguadb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export default dbConfig;