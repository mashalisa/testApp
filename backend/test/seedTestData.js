const {sequelize} = require('../configDB/sequelize')

const {  User,
  Grade,
  CoreSubject,
  Subject,
  Test,
  Question,
  Answer} = require('../configDB/models')


  async function  seedTestData() {
    await sequelize.sync({force: true})   
  
const questionDefs = [
  {
    name: 'What is 1/2 + 1/4?',
    answers: [
      { name: '3/4', correctAnswer: true },
      { name: '2/3', correctAnswer: false },
      { name: '1/6', correctAnswer: false },
    ],
  },
  {
    name: 'What is 3/5 - 1/5?',
    answers: [
      { name: '2/5', correctAnswer: true },
      { name: '1/5', correctAnswer: false },
      { name: '4/5', correctAnswer: false },
    ],
  },
  {
    name: 'Simplify 6/8',
    answers: [
      { name: '3/4', correctAnswer: true },
      { name: '6/4', correctAnswer: false },
      { name: '2/3', correctAnswer: false },
    ],
  },
];

  const teacher = await User.create({
    name: 'Alice Teacher',
    username: 'teacher1',
    email: 'teacher1@example.com',
    password: 'teacher',  
    role: 'teacher',
  })
    const student = await User.create({
    name: 'Bob Student',
    username: 'bob',
    email: 'student@example.com',
    password: 'bob',  
    role: 'student',
  })

    const grade = await Grade.create({ name: 'Grade 5' });
  const coreSubject = await CoreSubject.create({ name: 'Math' });
  const subject = await Subject.create({ name: 'Fractions' });

   const test = await Test.create({
    name: 'Fractions Quiz',
    teacher_id: teacher.id,
    grade_id: grade.id,
    coreSubject_id: coreSubject.id,
    subject_id: subject.id,
  });
  const answers = []
  const questions = []
  for (const q of questionDefs) {
    const question = await Question.create({
        name: q.name,
         test_id: test.id
    })
    questions.push(question)
    const answer = q.answers.map((ans) => ({
        ...ans,
        question_id: question.id
    }))
   
    const createdAns = await Answer.bulkCreate(answer);
     answers.push(...createdAns)
  }
return { teacher, student, test,  answers, questions};
}

module.exports = { seedTestData };