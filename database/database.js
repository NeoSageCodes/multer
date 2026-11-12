const {Sequelize} = require('sequelize');

const name = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.HOST;


const sequelize = new Sequelize(name, username, password, {
    host,
    dialect: 'mysql'
});

module.exports = sequelize;