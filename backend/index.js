

const { sequelize } = require('./configDB/sequelize')
const app = require('./configDB/app')

const startedService = async () => {
  try {
    await sequelize.authenticate() //checking connction
    console.log('✅ Connection has been established successfully.');

    // await sequelize.sync({ alter: true, logging: false });
    // await sequelize.sync({ force: true, logging: false });
console.log('✅ All tables including join tables are created!');
 
        await sequelize.sync();
    console.log('✅ Call models synced successfuly ');

    const PORT = 3000
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
    })
  } catch (error) {
    console.log('unable to start sterver', error)
  }
}


if (process.env.NODE_ENV !== 'test') {
    startedService();
    
  }




