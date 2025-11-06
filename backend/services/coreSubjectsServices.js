
const CoreSubjects = require('../configDB/models/coreSubjects')


const getAllCoreSubjects = async () => {
    const coreSubjects = await CoreSubjects.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return coreSubjects;
}

const getCoreSubjectById = async(id) => {
    const coreSubject = await CoreSubjects.findByPk(id, {
        attributes: {exclude: [ 'createdAt', 'updatedAt'] }
    });
    if(!coreSubject)  {
        throw new Error ('core Subject not found')
    }
    return coreSubject
}

const getCoreSubjectByName = async(name) => {
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
const createNewCoreSubject = async(name) => {
 if (!name || typeof name !== 'string' || !name.trim()) {
        throw new Error('Missing core subject name');
    }

    const existingCoreSubject  = await CoreSubjects.findOne({where: {name: name.trim()}});
    if(existingCoreSubject ) {
        throw new Error('this core Subject already exists');
    }

    const coreSubject = await CoreSubjects.create({ name: name.trim() });

    return coreSubject
}

const updateCoreSubject = async(id, name) => {
    const coreSubject = await CoreSubjects.findByPk(id)
    if (!coreSubject) {
    throw new Error('Core Subject not found');
}
    if (!name || typeof name !== 'string' || !name.trim()) {
          throw new Error('Invalid core subject name');
    }
    if( coreSubject.name !== name.trim()) {
        const exisingCoreSubject  = await CoreSubjects.findOne({where: {name: name.trim()}});
        if(exisingCoreSubject ) {
           throw new Error('A core Subject with this name already exists');
        }
    }

     coreSubject.name = name.trim();
    const updatedCoreSubject = await coreSubject.save()
    return updatedCoreSubject
}

const deleteCoreSubject = async(id) => {
    const coreSubject = await CoreSubjects.findByPk(id)
     if(!coreSubject) {
          throw new Error ('core Subject not found')
    }
    await coreSubject.destroy()
    return { message: 'this core Subject  deleted successfully' };
}

module.exports = {
 deleteCoreSubject,updateCoreSubject, createNewCoreSubject,  getCoreSubjectByName, getCoreSubjectById,getAllCoreSubjects
}