
const { User, gradeToTeacher, Grade } = require('../models');



const getAllGrades = async () => {
    const grades = await Grade.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return grades;
}

const getGradeById = async (id) => {
    const grade = await Grade.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!grade) {
        throw new Error('Grade not found')
    }
    return grade
}

const getGradeByName = async (name) => {
    const grade = await Grade.findOne({
        where: { name },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return grade
}
const createNewGrade = async (name) => {
    const exisingGrade = await Grade.findOne({ where: { name } });
    if (exisingGrade) {
        throw new Error('this grade already exists');
    }

    const newGrade = await Grade.create({ name });

    return newGrade
}

const updateGrade = async (id, name) => {
    const grade = await Grade.findByPk(id)

    const exisingGrade = await Grades.findOne({ where: { name } });
    if (exisingGrade) {
        throw new Error('A grade with this name already exists');
    }
    grade.name = name ?? grade.name;
    const updatedGrade = await grade.save()
    return updatedGrade
}

const deleteGrade = async (id) => {
    const grade = await Grade.findByPk(id)
    if (!grade) {
        throw new Error('grade not found')

    }
    await grade.destroy()
    return { message: 'this grade  deleted successfully' };
}

const assignGradesToTeacher = async (teacherId, grades) => {
    const teacher = await User.findByPk(teacherId)
    if (!teacher) {
        throw new Error('teacher not found')

    }
    const gradeRecords = await Grade.findAll({ where: { id: grades } })
    if (gradeRecords.length !== grades.length) {
        throw new Error("One or more grades not found");
    }
    await teacher.setGrades(grades)
    return { message: "Grades assigned successfully" };
}

module.exports = {
    getAllGrades, deleteGrade, updateGrade, createNewGrade, getGradeByName, getGradeById, assignGradesToTeacher
}