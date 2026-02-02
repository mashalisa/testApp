const { Test, User, Grade, CoreSubjects, Subjects, Question, Answer } = require('../models')

const getAllTest = async () => {
    const tests = await Test.findAll()
    if (!tests || tests.length === 0) {
        throw new Error('No tests found')
    }
    return tests
}

const getTestById = async (id) => {
    const test = await Test.findOne({
        where: { id },
        include: [{ model: Question, include: [Answer] }]
    })
    if (!test) {
        throw new Error('Test not found')
    }
    return test
}

const updateTestById = async (id, testData) => {
    const { name, coreSubject_id, subject_id, grade_id, test_URL } = testData

    console.log(test_URL, 'text_URL')


    const test = await Test.findByPk(id)
    if (!test) {
        throw new Error('a test not found')
    }

    if (grade_id) {
        const grade = await Grade.findByPk(grade_id);
        if (!grade) throw new Error('Invalid grade ID');
    }

    if (coreSubject_id) {
        const coreSubject = await CoreSubjects.findByPk(coreSubject_id);
        if (!coreSubject) throw new Error('Invalid core subject ID');
    }

    if (subject_id) {
        const subject = await Subjects.findByPk(subject_id);
        if (!subject) throw new Error('Invalid subject ID');
    }

    if (name) {
        const existingTest = await Test.findOne({ where: { name } });
        if (existingTest) {
            throw new Error('A test with this name already exists');
        }
    }


    const updatedTest = await test.update({
        name: name ?? test.name,
        coreSubject_id: coreSubject_id ?? test.coreSubject_id,
        subject_id: subject_id ?? test.subject_id,
        grade_id: grade_id ?? test.grade_id,
        test_URL: test_URL ?? test.test_URL,
    })

    return updatedTest
}

const createTest = async (teacherId, testData) => {

    const { name, coreSubject_id, subject_id, grade_id, text_URL } = testData


    const user = await User.findOne({ where: { id: teacherId, role: 'teacher' } })
    if (!user) {
        throw new Error('Teacher not found');
    }

    const grade = await Grade.findByPk(grade_id);
    if (!grade) throw new Error('Grade not found');

    const coreSubject = await CoreSubjects.findByPk(coreSubject_id);
    if (!coreSubject) throw new Error('Core subject not found');

    const subject = await Subjects.findByPk(subject_id);
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