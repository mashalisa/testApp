const coreSubjectServices = require('../services/coreSubjectsServices')


const coreSubjectController = {
    async createCoreSubject(req, res) {
        try {
            const { name, grade_id: gradeId } = req.validatedBody;


            if (!name || !gradeId) {
                return res.status(400).json({ error: 'Invalid data' });
            }
            const newCoreSubject = await coreSubjectServices.createNewCoreSubject(name, gradeId);

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
            const coreSubject = await coreSubjectServices.getCoreSubjectById(req.validatedParams.id)
            res.status(200).json(coreSubject)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async getCoreSubjectByName(req, res) {
        try {
            const { name } = req.validatedQuery;
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
            const { name, grade_id: gradeId } = req.validatedBody;
            if (!name || !gradeId) {
                return res.status(400).json({ error: 'Invalid data' });
            }
            const updatedCoreSubject = await coreSubjectServices.updateCoreSubject(req.validatedParams.id, name, gradeId)
            res.status(200).json(updatedCoreSubject);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deleteCoreSubject(req, res) {
        try {
            const coreSubject = await coreSubjectServices.deleteCoreSubject(req.validatedParams.id)
            res.status(200).json(coreSubject)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }

    },

    async assignCoreSubjectsToTeacher(req, res) {
        try {
            const teacherId = req.validatedParams.teacherId
            const {coreSubjectsData} = req.validatedBody
            const coreSubject = await coreSubjectServices.assignCoreSubjectsToTeacher(teacherId, coreSubjectsData)
            res.status(200).json({
                success: true,
                message: 'core subjects assigned successfully'
            });
        } catch (error) {
            res.status(404).json({ error: error.message })
        }

    }

}

module.exports = coreSubjectController