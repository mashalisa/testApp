const subjectsServices = require('../services/subjectsServices')


const subjectController = {
    async createSubject(req, res) {
        try {
            const { name } = req.body;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid Subject name' });
            }
            const newSubject = await subjectsServices.createNewSubject(name);
            
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
            const subject = await subjectsServices.getSubjectById(req.params.id)
            res.status(200).json(subject)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async getSubjectByName(req, res) {
        try {
              const { name } = req.query;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid Subject name' });
            }
            const subject = await subjectsServices.getSubjectByName(name)
           
            res.status(200).json(subject)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async updateSubject(req, res) {
        try {
               const { name } = req.body;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid Subject name' });
            }
            const updatedSubject = await subjectsServices.updateSubject(req.params.id, name)
            res.status(200).json(updatedSubject);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deleteSubject(req, res) {
        try {
            const subject = await subjectsServices.deleteSubject(req.params.id)
            res.status(200).json(subject)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }

    },

}

module.exports = subjectController