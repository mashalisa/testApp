const subjectsServices = require('../services/subjectsServices')


const subjectController = {
    async createSubject(req, res) {
        try {
             const { name, grade_id: gradeId, coreSubject_id: coreSubjectId } = req.validatedBody;
             console.log(name, gradeId, coreSubjectId, 'data')
            
        
            const newSubject = await subjectsServices.createNewSubject(name, gradeId, coreSubjectId);
            
            res.status(201).json(newSubject) //201 Created
        } catch (error) {
            res.status(400).json({ error: error.message }) //400 Bad Request
        }
    },

    async getAllSubject(req, res) {
        try {
            const subjects = await subjectsServices.getAllSubjects()
            res.status(200).json(subjects);
        } catch (error) {
            res.status(500).json({ error: error.message }) //Internal Server Error
        }
    },

    async getSubjectByID(req, res) {
        try {
            const subject = await subjectsServices.getSubjectById(req.validatedParams.id)
            res.status(200).json(subject)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async getSubjectByName(req, res) {
        try {
              const { name } = req.validatedQuery;
          
            const subject = await subjectsServices.getSubjectByName(name)
           
            res.status(200).json(subject)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async updateSubject(req, res) {
        try {
               const { name, grade_id: gradeId, coreSubject_id: coreSubjectId } = req.validatedBody;
            
           
            const updatedSubject = await subjectsServices.updateSubject(req.validatedParams.id, name, gradeId, coreSubjectId)
            res.status(200).json(updatedSubject);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deleteSubject(req, res) {
        try {
            const subject = await subjectsServices.deleteSubject(req.validatedParams.id)
            res.status(200).json(subject)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }

    },
    async assignSubjectsToTeacher(req, res) {
        const {subjectsData} = req.validatedBody
        const teacherId = req.validatedParams.teacherId
        console.log(req.validatedBody, 'req.validatedBody')
        try {
            const subject = await subjectsServices.assignSubjectsToTeacher(teacherId, subjectsData)
             res.status(200).json(subject)
        }catch (error) {
            res.status(404).json({ error: error.message })
        }
    }

}

module.exports = subjectController