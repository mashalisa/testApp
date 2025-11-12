// npm init -y
// npm install express


const { sequelize } = require('./sequelize')
const express = require('express')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const userRoutes = require('../routes/userRoutes')
const gradeRoutes = require('../routes/gradesRoutes')
const coreSublectsRoutes = require('../routes/coreSubjectsRoutes')
const sublectsRoutes = require('../routes/subjectsRoutes')
const teacherRoutes = require('../routes/teacherRoutes')
const testRoutes = require('../routes/testRoutes')
const questionRoutes = require('../routes/questionRoutes')
const answerRoutes = require('../routes/answerRoutes')
const studentTestRoutes = require('../routes/studentTestRoutes')
const studentScoreRoutes = require('../routes/studentScoreRoutes')
const authController = require('../routes/authRoutes')
const studentAnswerRoutes = require('../routes/studentAnswerRoutes')
const models = require('../configDB/models');
require('./models/users');
require('dotenv').config()


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
app.use('/student-score', studentScoreRoutes)
app.use('/autorization', authController)
app.use('/testAnswers', studentAnswerRoutes)

app.get('/', (req, res) => {
    res.send('start backend')
})

module.exports = app;
