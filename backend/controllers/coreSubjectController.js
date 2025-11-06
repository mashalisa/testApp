const coreSubjectServices = require('../services/coreSubjectsServices')


const coreSubjectController = {
    async createCoreSubject(req, res) {
        try {
            const { name } = req.body;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid Core Subject name' });
            }
            const newCoreSubject = await coreSubjectServices.createNewCoreSubject(name);
            
            res.status(201).json(newCoreSubject) //201 Created
        } catch (error) {
            res.status(400).json({ error: error.message }) //400 Bad Request
        }
    },

    async getAllCoreSubject(req, res) {
        try {
            const coreSubjects = await coreSubjectServices.getAllCoreSubjects()
            res.status(200).json(coreSubjects);
        } catch (error) {
            res.status(500).json({ error: error.message }) //Internal Server Error
        }
    },

    async getCoreSubjectByID(req, res) {
        try {
            const coreSubject = await coreSubjectServices.getCoreSubjectById(req.params.id)
            res.status(200).json(coreSubject)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async getCoreSubjectByName(req, res) {
        try {
              const { name } = req.query;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid Core Subject name' });
            }
            const coreSubject = await coreSubjectServices.getCoreSubjectByName(name)
           
            res.status(200).json(coreSubject)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async updateCoreSubject(req, res) {
        try {
               const { name } = req.body;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid core Subject name' });
            }
            const updatedCoreSubject = await coreSubjectServices.updateCoreSubject(req.params.id, name)
            res.status(200).json(updatedCoreSubject);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deleteCoreSubject(req, res) {
        try {
            const coreSubject = await coreSubjectServices.deleteCoreSubject(req.params.id)
            res.status(200).json(coreSubject)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }

    },

}

module.exports = coreSubjectController