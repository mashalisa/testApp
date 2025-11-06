
const Subjects = require('../configDB/models/subjects')


const getAllSubjects = async () => {
    const subjects = await Subjects.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return subjects;
}

const getSubjectById = async(id) => {
    const subjects = await Subjects.findByPk(id, {
        attributes: {exclude: [ 'createdAt', 'updatedAt'] }
    });
    if(!subjects)  {
        throw new Error ('Subject not found')
    }
    return subjects
}

const getSubjectByName = async(name) => {
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
const createNewSubject = async(name) => {
 if (!name || typeof name !== 'string' || !name.trim()) {
        throw new Error('Missing subject name');
    }

    const existingSubject  = await Subjects.findOne({where: {name: name.trim()}});
    if(existingSubject ) {
        throw new Error('this Subject already exists');
    }

    const subjects = await Subjects.create({ name: name.trim() });

    return subjects
}

const updateSubject = async(id, name) => {
    const subjects = await Subjects.findByPk(id)
    if (!subjects) {
    throw new Error('Subject not found');
}
    if (!name || typeof name !== 'string' || !name.trim()) {
          throw new Error('Invalid subject name');
    }
    if( subjects.name !== name.trim()) {
        const existingSubject  = await Subjects.findOne({where: {name: name.trim()}});
        if(existingSubject ) {
           throw new Error('A subject with this name already exists');
        }
    }

     subjects.name = name.trim();
    const updatedSubject = await subjects.save()
    return updatedSubject
}

const deleteSubject = async(id) => {
    const subjects = await Subjects.findByPk(id)
     if(!subjects) {
          throw new Error ('Subject not found')
    }
    await subjects.destroy()
    return { message: 'This subject deleted successfully' };
}

module.exports = {
deleteSubject,updateSubject,createNewSubject,getSubjectByName,getSubjectById,getAllSubjects
}