import {Sequelize} from "sequelize"
import dotenv from "dotenv"
dotenv.config()

// Определение настроек для разных сред
const isProduction = process.env.NODE_ENV === 'production';
const dbConfig = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {}
};

// Дополнительные настройки для продакшн среды
if (isProduction) {
    dbConfig.dialectOptions.ssl = {
        require: true,
        rejectUnauthorized: false // Внимание: это создает уязвимость безопасности, если ваш сертификат должен быть проверен
    };
}

export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    dialectOptions: dbConfig.dialectOptions
});
