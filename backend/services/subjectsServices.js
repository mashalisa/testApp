
const { Grade, CoreSubjects, Subjects } = require('../configDB/models');


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
    if (!name || typeof name !== 'string' || !name.trim()) {
        throw new Error('Invalid subject name');
    }

    const subjects = await Subjects.findOne({
        where: { name: name.trim() },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!subjects) {
        throw new Error('Subject not found');
    }
    return subjects
}
const createNewSubject = async ( name, gradeId, coreSubjectId) => {
  
    if (!name || typeof name !== 'string' || !name.trim()) {
        throw new Error('Missing subject name');
    }
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
        name: name.trim(),
        grade_id: gradeId,
        coreSubject_id: coreSubjectId
    });

    return subjects
}

const updateSubject = async (id, name, gradeId, coreSubjectId) => {
   

    if (typeof name !== 'string' || !name.trim()) {
        throw new Error('Invalid subject name');
    }
    if (!gradeId) {
        throw new Error('Grade id not found');
    }
    if (!coreSubjectId) {
        throw new Error('Core Subject id not found');
    }
    const subjects = await Subjects.findByPk(id)
    if (!subjects) {
        throw new Error('Subject not found');
    }
    const grade = await Grade.findByPk(gradeId)
    if (!grade) {
        throw new Error('Grade not found');
    }
if (coreSubject.grade_id !== gradeId) {
        throw new Error('Core subject does not belong to the provided grade');
    }
    const coreSubject = await CoreSubjects.findByPk(coreSubjectId)
    if (!coreSubject) {
        throw new Error('Core subject not found');
    }
   
    if (subjects.name !== name.trim()) {
        const existingSubject = await Subjects.findOne({ where: { name: name.trim(), grade_id: gradeId, coreSubject_id: coreSubjectId } });
        if (existingSubject) {
            throw new Error('A subject with this name already exists');
        }
    }

    subjects.name = name.trim();
    subjects.grade_id = gradeId;
    subjects.coreSubject_id = coreSubjectId;
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

module.exports = {
    deleteSubject, updateSubject, createNewSubject, getSubjectByName, getSubjectById, getAllSubjects
}