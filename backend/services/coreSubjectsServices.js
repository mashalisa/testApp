
const { CoreSubjects, Grade } = require('../configDB/models')


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
    if (!name || typeof name !== 'string' || !name.trim()) {
        throw new Error('Invalid core subject name');
    }

    const coreSubject = await CoreSubjects.findOne({
        where: { name: name.trim() },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    if (!coreSubject) {
        throw new Error('Core Subject not found');
    }
    return coreSubject
}
const createNewCoreSubject = async (name, gradeId) => {



    if (!name || typeof name !== 'string' || !name.trim() ) {
        throw new Error('Invalid core subject name');
    }
    if(!gradeId) {
        throw new Error('Missing grade id');
    }
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

const updateCoreSubject = async (id,  name, gradeId) => {
     
    const coreSubject = await CoreSubjects.findByPk(id)
    if (!coreSubject) {
        throw new Error('Core Subject not found');
    }
    if(!gradeId) {
        throw new Error('Missing grade id');
    }
     const grade = await Grade.findByPk(gradeId)
    if (!grade) {
        throw new Error('grade not found');
    }
     if (!name || typeof name !== 'string' || !name.trim() ) {
        throw new Error('Invalid core subject name');
    }
    if (coreSubject.name !== name.trim()) {
        const exisingCoreSubject = await CoreSubjects.findOne({ where: { name: name.trim(), grade_id: gradeId } });
        if (exisingCoreSubject) {
            throw new Error('A core Subject with this name already exists');
        }
    }

    coreSubject.name = name.trim();
      coreSubject.grade_id = gradeId;
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

module.exports = {
    deleteCoreSubject, updateCoreSubject, createNewCoreSubject, getCoreSubjectByName, getCoreSubjectById, getAllCoreSubjects
}