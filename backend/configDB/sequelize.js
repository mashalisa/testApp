// npm install sequelize
//npm install mysql2 (cannot use Sequelize with MySQL without installing mysql2,
// Sequelize is an ORM (Object-Relational Mapper), not a database driver.
//  It needs a database-specific driver to actually communicate with your database.)
const {Sequelize }  = require ('sequelize')
require('dotenv').config()

const isTest = process.env.NODE_ENV === 'test';

const sequelize = isTest
  ? new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    });

module.exports = { sequelize };