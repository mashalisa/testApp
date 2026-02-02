require('dotenv').config();

module.exports = {
  isTest: process.env.NODE_ENV === 'test',

  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};

