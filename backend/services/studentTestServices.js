
const { User, StudentTest, Test } = require('../models')


const getAllTestsByStudent = async (studentId) => {
    console.log(studentId, 'studentId')
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


    const studentTest  = await StudentTest.findOne({
         where: {
             user_id: studentId, 
            test_id: testId,
              status: 'waiting' }
             })

    if (!studentTest ) {
      throw new Error('Test not assigned or already started');
    }
if (studentTest.status === 'in_progress') {
  throw new Error('This test is already in progress');
}
    studentTest.status = 'in_progress';
  studentTest.start_time = new Date();

  await studentTest.save();

  return studentTest;

  
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
const assignTestToStudent = async (testId, studentIds) => {
    const test = await Test.findByPk(testId)
    if (!test) {
        throw new Error('test no fund ')
    }
    const results = [];
    for (const studentId of studentIds) {
        const student = await User.findOne({ where: { id: studentId, role: 'student' } })
        if (!student) {
            throw new Error(`Student not found: ${studentId}`);
        }
        const existing = await StudentTest.findOne({ where: { test_id: testId, user_id: studentId } });
        if (existing) {
            throw new Error(`Test already assigned to student: ${studentId}`);
        }

        const entry = await StudentTest.create({
            user_id: studentId,
            test_id: testId,
            status: 'waiting',
        });

        results.push(entry);

    };
    return results;

}
module.exports = {
    deleteStudentTest,
    getAllTestsByCurrentStudent,
    updateStudentTest,
    createNewTestByStudent,
    getAllStudentsByTestId,
    getAllTestsByStudent,
    assignTestToStudent
}