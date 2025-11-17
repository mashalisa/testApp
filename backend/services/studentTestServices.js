
const { User, StudentTest, Test } = require('../configDB/models')


const getAllTestsByStudent = async (studentId) => {
    const tests = await StudentTest.findAll({
        where: { user_id: studentId },
        include: [Test]
    })
    if (!tests || tests.length === 0) {
        throw new Error('no test for this student')
    }
    return tests
}

const getAllTestsByCurrentStudent = async (studentId) => {
    const tests = await StudentTest.findAll({
        where: { user_id: studentId },
        include: [Test]
    })
    if (!tests || tests.length === 0) {
        throw new Error('no test for this student')
    }
    return tests
}

const getAllStudentsByTestId = async (testId) => {
    const students = await StudentTest.findAll({ where: { test_id: testId }, include: [User] })
    if (!students || students.length === 0) {
        throw new Error('no students for this test')
    }
    return students
}

const createNewTestByStudent = async (testId, studentId, studentTestData) => {
    const test = await Test.findByPk(testId)
    if (!test) throw new Error('Test not found');

    const student = await User.findByPk(studentId);
    if (!student || student.role !== 'student') {
        throw new Error('Student not found');
    }

    const { start_time, status } = studentTestData


    const existingEntry = await StudentTest.findOne({ where: { user_id: studentId, test_id: testId } })

    if (existingEntry) {
        throw new Error('this student already has a record for htis test')
    }

    const newStudentTest = await StudentTest.create(
        {
            user_id: studentId,
            test_id: testId,
            status: status || 'in_progress',
            start_time: studentTestData.start_time || new Date(),
            end_time: studentTestData.end_time || null
        }

    )

    return newStudentTest
}

const updateStudentTest = async (testId, studentId, studentTestData) => {

    const { end_time, status } = studentTestData
    const entry = await StudentTest.findOne({ where: { test_id: testId, user_id: studentId } });
    if (!entry) throw new Error('Student test entry not found');

    const updatedEntry = await entry.update({
        status: status || entry.status,
        end_time: end_time || new Date()
    })

    return updatedEntry
}

const deleteStudentTest = async (id) => {
    const entry = await StudentTest.findByPk(id)
    if (!entry) {
        throw new Error('entry no fund ')
    }
    await entry.destroy()

    return 'deleted successfully'
}

module.exports = {
    deleteStudentTest, getAllTestsByCurrentStudent, updateStudentTest, createNewTestByStudent, getAllStudentsByTestId, getAllTestsByStudent
}