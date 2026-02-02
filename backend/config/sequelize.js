// npm install sequelize
//npm install mysql2 (cannot use Sequelize with MySQL without installing mysql2,
// Sequelize is an ORM (Object-Relational Mapper), not a database driver.
//  It needs a database-specific driver to actually communicate with your database.)
const { Sequelize } = require('sequelize')
const config = require('./config');
require('dotenv').config()

const isTest = process.env.NODE_ENV === 'test';

const sequelize = isTest
  ? new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })
  : new Sequelize(
    config.database.name,
    config.database.user,
    config.database.pass, {
    host: config.database.host,
    dialect: config.database.dialect,
  });

module.exports = { sequelize };