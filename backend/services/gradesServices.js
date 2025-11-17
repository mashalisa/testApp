
const Grades = require('../configDB/models/grades')


const getAllGrades = async () => {
    const grades = await Grades.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return grades;
}

const getGradeById = async (id) => {
    const grade = await Grades.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!grade) {
        throw new Error('Grade not found')
    }
    return grade
}

const getGradeByName = async (name) => {
    const grade = await Grades.findOne({
        where: { name },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return grade
}
const createNewGrade = async (name) => {
    const exisingGrade = await Grades.findOne({ where: { name } });
    if (exisingGrade) {
        throw new Error('this grade already exists');
    }

    const newGrade = await Grades.create({ name });

    return newGrade
}

const updateGrade = async (id, name) => {
    const grade = await Grades.findByPk(id)

        const exisingGrade = await Grades.findOne({ where: { name } });
        if (exisingGrade) {
            throw new Error('A grade with this name already exists');
        }
    grade.name = name ??  grade.name;
    const updatedGrade = await grade.save()
    return updatedGrade
}

const deleteGrade = async (id) => {
    const grade = await Grades.findByPk(id)
    if (!grade) {
        throw new Error('grade not found')
        
    }
    await grade.destroy()
    return { message: 'this grade  deleted successfully' };
}

module.exports = {
    getAllGrades, deleteGrade, updateGrade, createNewGrade, getGradeByName, getGradeById
}