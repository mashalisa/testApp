
const { CoreSubjects, Grade, User } = require('../models')


const getAllCoreSubjects = async () => {
    const coreSubjects = await CoreSubjects.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return coreSubjects;
}

const getCoreSubjectById = async (id) => {
    const coreSubject = await CoreSubjects.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!coreSubject) {
        throw new Error('core Subject not found')
    }
    return coreSubject
}

const getCoreSubjectByName = async (name) => {
    const coreSubject = await CoreSubjects.findOne({
        where: { name },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!coreSubject) {
        throw new Error('Core Subject not found');
    }
    return coreSubject
}
const createNewCoreSubject = async (name, gradeId) => {
    const grade = await Grade.findByPk(gradeId)
    if (!grade) {
        throw new Error('grade not found');
    }

    const existingCoreSubject = await CoreSubjects.findOne({ where: { name: name.trim(), grade_id: gradeId } });
    if (existingCoreSubject) {
        throw new Error('this core Subject already exists');
    }

    const coreSubject = await CoreSubjects.create({ name: name.trim(), grade_id: gradeId });

    return coreSubject
}

const updateCoreSubject = async (id, name, gradeId) => {

    const coreSubject = await CoreSubjects.findByPk(id)


    if (gradeId) {
        const grade = await Grade.findByPk(gradeId)
        if (!grade) throw new Error('Invalid grade ID');
    }

    const exisingCoreSubject = await CoreSubjects.findOne({ where: { name: name ?? coreSubject.name, grade_id: gradeId ?? coreSubject.grade_id } });
    if (exisingCoreSubject) {
        throw new Error('A core Subject with this name already exists');
    }


    coreSubject.name = name ?? coreSubject.name
    coreSubject.grade_id = gradeId ?? coreSubject.grade_id
    const updatedCoreSubject = await coreSubject.save()
    return updatedCoreSubject
}

const deleteCoreSubject = async (id) => {
    const coreSubject = await CoreSubjects.findByPk(id)
    if (!coreSubject) {
        throw new Error('core Subject not found')
    }
    await coreSubject.destroy()
    return { message: 'this core Subject  deleted successfully' };
}
const assignCoreSubjectsToTeacher = async (teacherId, coreSubjects) => {
console.log(teacherId, 'teacherId')
    const teacher = await User.findByPk(teacherId)
    console.log(teacher, 'teacher')
    if (!teacher) {
        throw new Error('teacher not found')

    }
        
    const coreSubjectsRecords = await CoreSubjects.findAll({ where: { id: coreSubjects } })
    if (coreSubjectsRecords.length !== coreSubjects.length) {
        throw new Error("One or more core Subjects not found");
    }
    await teacher.setCoreSubjects(coreSubjects)
    return { message: "core Subjects assigned successfully" };
}

module.exports = {
    deleteCoreSubject,
    updateCoreSubject,
    createNewCoreSubject,
    getCoreSubjectByName,
    getCoreSubjectById,
    getAllCoreSubjects,
    assignCoreSubjectsToTeacher
}