// npm init -y
// npm install express
const { sequelize } = require('./configDB/sequelize')
const express = require('express')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./configDB/swagger');

const userRoutes = require('./routes/userRoutes')
const gradeRoutes = require('./routes/gradesRoutes')
const coreSublectsRoutes = require('./routes/coreSubjectsRoutes')
const sublectsRoutes = require('./routes/subjectsRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const testRoutes = require('./routes/testRoutes')
const questionRoutes = require('./routes/questionRoutes')
const answerRoutes = require('./routes/answerRoutes')
const studentTestRoutes = require('./routes/studentTestRoutes')
const studentScoreRoutes = require('./routes/studentScoreRoutes')
const authController = require('./routes/authRoutes')
const studentAnswerRoutes = require('./routes/studentAnswerRoutes')
const models = require('./configDB/models'); 
require('./configDB/models/users');





const startedService = async () => {
  try {
    await sequelize.authenticate() //checking connction
    console.log('✅ Connection has been established successfully.');

    await sequelize.sync({ alter: true, logging: false });
    // await sequelize.sync({ force: true, logging: false });
console.log('✅ All tables including join tables are created!');
        // await sequelize.sync();
    console.log('✅ Call models synced successfuly ');

    const app = express()



    app.use(express.json())


    const swaggerUiOptions = {
      swaggerOptions: {
        tagsSorter: 'alpha',       //  sorts  tags alphabetically
        operationsSorter: 'none',  // keeps endpoints in the same order as in code
        docExpansion: 'list',      // shows all tags collapsed or expanded
      },
    };



    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

    app.use('/api/users', userRoutes);
    app.use('/api/grades', gradeRoutes);
    app.use('/api/coreSubjects', coreSublectsRoutes);
    app.use('/api/subjects', sublectsRoutes);
    app.use('/api/teachers', teacherRoutes)
    app.use('/api/tests', testRoutes)
    app.use('/api/questions', questionRoutes)
    app.use('/api/answers', answerRoutes)
    app.use('/api/student-tests', studentTestRoutes)
    app.use('/api/student-score', studentScoreRoutes)
    app.use('/autorization', authController)
    app.use('/testAnswers', studentAnswerRoutes)


    app.get('/', (req, res) => {
      res.send('start backend')
    })

    const PORT = 3000
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
    })
  } catch (error) {
    console.log('unable to start sterver', error)
  }
}

startedService()
// sequelize.authenticate().then(() => { //checking connction
//   console.log('✅ Connection has been established successfully.');
//   return sequelize.sync({ alter: true, logging: false }); //updating tables
//   // return sequelize.sync({ force: true, logging: console.log }); //createing tables

// }).catch(err => {
//   console.error('❌ Unable to connect to the database:', err);
// })




