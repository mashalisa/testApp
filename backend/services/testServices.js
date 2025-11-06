const { Test, User,  Grade, CoreSubject, Subject } = require('../configDB/models')

const getAllTest = async () => {
    const tests = await Test.findAll()
    if (!tests || tests.length === 0) {
        throw new Error('No tests found')
    }
    return tests
}

const getTestById = async (id) => {
    const test = await Test.findByPk(id)
    if (!test) {
        throw new Error('Test not found')
    }
    return test
}

const updateTestById = async (id, testData) => {
      const { name, coreSubject_id, subject_id, grade_id, text_URL} = testData


    const test = await Test.findByPk(id)
    if (!test) {
        throw new Error('a test not found')
    }

    const updatedTest = await test.update({
        name: name ?? test.name,
        coreSubject_id: coreSubject_id ?? test.coreSubject_id,
        subject_id: subject_id ?? test.subject_id,
        grade_id: grade_id ?? test.grade_id,
        text_URL: text_URL ?? test.text_URL,
    })

    return updatedTest
}

const createTest = async ( teacherId, testData) => {
  
    const { name, coreSubject_id, subject_id, grade_id, text_URL} = testData
    if (!name || !coreSubject_id || !subject_id || !grade_id || !teacherId) {
        throw new Error('Missing required data');
    }
   
    const user = await User.findOne({ where: { id: teacherId, role: 'teacher' } })
    if (!user) {
        throw new Error('Teacher not found');
    }

 const grade = await Grade.findByPk(grade_id);
  if (!grade) throw new Error('Grade not found');

  const coreSubject = await CoreSubject.findByPk(coreSubject_id);
  if (!coreSubject) throw new Error('Core subject not found');

  const subject = await Subject.findByPk(subject_id);
  if (!subject) throw new Error('Subject not found');


  const existingTest = await Test.findOne({ where: { name } });

if (existingTest) {
    throw new Error('This test already exists')
}
  const newTest = await Test.create({
    name,
    coreSubject_id,
    subject_id,
    grade_id,
    teacher_id: teacherId,
    text_URL,
  });

return newTest
}

const deleteTestById = async (id) => {
    const test = await Test.findByPk(id)
    if (!test) {
        throw new Error('a test not found')
    }
    await test.destroy()
    return 'the test deleted succssfuly '
}

module.exports = {
    deleteTestById, createTest, updateTestById, getTestById, getAllTest
}