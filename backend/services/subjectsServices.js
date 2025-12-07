
const { Grade, CoreSubjects, Subjects, User } = require('../configDB/models');


const getAllSubjects = async () => {
    const subjects = await Subjects.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return subjects;
}

const getSubjectById = async (id) => {
    const subjects = await Subjects.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!subjects) {
        throw new Error('Subject not found')
    }
    return subjects
}

const getSubjectByName = async (name) => {
    const subjects = await Subjects.findOne({
        where: { name: name.trim() },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!subjects) {
        throw new Error('Subject not found');
    }
    return subjects
}
const createNewSubject = async (name, gradeId, coreSubjectId) => {

    const grade = await Grade.findByPk(gradeId)
    if (!grade) {
        throw new Error('Grade not found');
    }

    const coreSubject = await CoreSubjects.findByPk(coreSubjectId)
    if (!coreSubject) {
        throw new Error('Core subject not found');
    }
    if (coreSubject.grade_id !== gradeId) {
        throw new Error('Core subject does not belong to the provided grade');
    }
    const existingSubject = await Subjects.findOne({ where: { name: name.trim(), grade_id: gradeId, coreSubject_id: coreSubjectId } });
    if (existingSubject) {
        throw new Error('this Subject already exists');
    }

    const subjects = await Subjects.create({
        name,
        grade_id: gradeId,
        coreSubject_id: coreSubjectId
    });

    return subjects
}

const updateSubject = async (id, name, gradeId, coreSubjectId) => {

    if (gradeId) {
        const grade = await Grade.findByPk(gradeId)
        if (!grade) {
            throw new Error('Grade not found');
        }
    }
    if (coreSubjectId) {
        const coreSubject = await CoreSubjects.findByPk(coreSubjectId)
        if (!coreSubject) {
            throw new Error('Core subject not found');
        }
        if (coreSubject.grade_id !== gradeId) {
            throw new Error('Core subject does not belong to the provided grade');
        }
    }

    const subjects = await Subjects.findByPk(id)
    if (!subjects) {
        throw new Error('Subject not found');
    }

    const existingSubject = await Subjects.findOne({ where: { name, grade_id: gradeId, coreSubject_id: coreSubjectId } });
    if (existingSubject) {
        throw new Error('A subject with this name already exists');

    }

    subjects.name = name ?? subjects.name;
    subjects.grade_id = gradeId ?? subjects.grade_id;
    subjects.coreSubject_id = coreSubjectId ?? subjects.coreSubject_id;
    const updatedSubject = await subjects.save()
    return updatedSubject
}

const deleteSubject = async (id) => {
    const subjects = await Subjects.findByPk(id)
    if (!subjects) {
        throw new Error('Subject not found')
    }
    await subjects.destroy()
    return { message: 'This subject deleted successfully' };
}
const assignSubjectsToTeacher = async (teacherId, subjects) => {

    const teacher = await User.findByPk(teacherId)
    if (!teacher) {
        throw new Error('teacher not found')
    }
    const subjectsData = await Subjects.findAll({ where: { id: subjects } })

console.log(subjectsData, 'subjectsData')
    if (subjectsData.length !== subjects.length) {
        throw new Error("One or more subjects not found");
    }
         
    await teacher.setSubjects(subjects)
    return { message: "subjects assigned successfully" };
}
module.exports = {
    deleteSubject,
    updateSubject,
    createNewSubject,
    getSubjectByName,
    getSubjectById,
    getAllSubjects,
    assignSubjectsToTeacher
}