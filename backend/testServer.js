require('dotenv').config();
const { Sequelize } = require('sequelize');
const express = require('express');

console.log('Starting test server...');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log, // logs SQL queries
  }
);

const testServer = async () => {
  try {
    console.log('Authenticating DB connection...');
    await sequelize.authenticate();
    console.log('✅ DB connection works!');

    const app = express();
    app.use(express.json());

    app.get('/', (req, res) => res.send('Hello World!'));

    const PORT = 3000;
    const server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

    // Detect process exit
    process.on('exit', (code) => {
      console.log(`⚠️ Process exit detected with code: ${code}`);
    });

    process.on('uncaughtException', (err) => {
      console.error('❌ Uncaught exception:', err);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    });

  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
};

testServer();
