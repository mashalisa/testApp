// npm install --save-dev jest supertest cross-env
// npm install --save-dev sqlite3

const { sequelize } = require("../configDB/sequelize");
const app = require('../configDB/app');
const request = require('supertest');
const {seedTestData } = require('./seedTestData');


let teacher, student, exam, questions, answers;
beforeAll(async () => {
   ({ teacher, student, test: exam, questions, answers } = await seedTestData());
});

afterAll(async () => {
    await sequelize.close()
})

test('student completes a test and receives a score', async () => {


    const teacherLogin = await request(app)
    .post('/autorization/teachers/login')
    .send({username: 'teacher1', password: 'teacher'})
    console.log(teacherLogin, 'teacherLogin')


    const teacherToken = teacherLogin.body.data.token;
    console.log(teacherToken, 'teacherToken')

     const studentLogin = await request(app)
    .post('/autorization/students/login')
    .send({username: 'bob', password: 'bob'})

    console.log(studentLogin, 'studentLogin')

    const StudentToken = studentLogin.body.data.token;

    console.log(StudentToken, 'StudentToken')

    await request(app)
    .post(`/api/student-tests/test/${exam.id}/students/${student.id}`) 
    .set('Authorization', `Bearer ${teacherToken}`)
    .send({ status: 'in_progress', start_time: new Date().toISOString() })
    .expect(201);

     await request(app)
    .post(`/testAnswers/by-id/student/${student.id}/test/${exam.id}/submit`)
    .set('Authorization', `Bearer ${StudentToken}`)
    .send([
      { question: questions[0].id, answer: answers[0].id },
      { question: questions[1].id, answer: answers[1].id },
      { question: questions[2].id, answer: answers[2].id },
    ])
     .expect(200);

     const scoreRes = await request(app)
    .post(`/student-score/calculate/${exam.id}/${student.id}`)
    .set('Authorization', `Bearer ${teacherToken}`)
    .expect(201);
console.log(scoreRes.body); 
    expect(scoreRes.body.data).toMatchObject({
    score: expect.any(Number),
    totalQuestions: expect.any(Number),
    correctCount: expect.any(Number),
  });

})