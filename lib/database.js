// index.js

import { Sequelize } from 'sequelize';
import UserModel from '@/model/User';
import { config } from 'dotenv';
config();
import mysql2 from 'mysql2';

// Use the variables
const dbHost = process.env.DB_HOST;
const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbDialect = process.env.DB_DIALECT;
const dbPort = process.env.DB_PORT;

console.log(dbHost, dbUserName, dbPassword, dbName, dbDialect);

// Create a Sequelize instance
export const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    port: dbPort,
    dialectModule: mysql2,
});

// Define the User model using UserModel and pass the Sequelize instance
const User = UserModel(sequelize);
User.sync();

// Synchronize the model with the database
sequelize.sync() // { force: true } will drop the table if it exists
.then(() => {
    console.log('Database Connected!');
})
.catch((err) => {
    console.error('Error connecting database or creating tables:', err);
});
