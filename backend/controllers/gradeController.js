const gradeServices = require('../services/gradesServices')


const gradeController = {
    async createGrade(req, res) {
        try {
            const { name } = req.validatedBody;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid grade name' });
            }
            const newGrade = await gradeServices.createNewGrade(name);
            
            res.status(201).json(newGrade) //201 Created
        } catch (error) {
            res.status(400).json({ error: error.message }) //400 Bad Request
        }
    },

    async getAllGrades(req, res) {
        try {
            const grades = await gradeServices.getAllGrades()
            res.status(200).json(grades);
        } catch (error) {
            res.status(500).json({ error: error.message }) //Internal Server Error
        }
    },

    async getGradeByID(req, res) {
        try {
            const grade = await gradeServices.getGradeById(req.validatedParams.id)
            res.status(200).json(grade)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async getGradeByName(req, res) {
        try {
              const { name } = req.validatedQuery;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid grade name' });
            }
            const grade = await gradeServices.getGradeByName(name)
           
            res.status(200).json(grade)
        } catch (error) {
            res.status(404).json({ error: error.message }) //404 Not Found
        }

    },
    async updateGrade(req, res) {
        try {
               const { name } = req.validatedBody;
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid grade name' });
            }
            const updatedGrade = await gradeServices.updateGrade(req.validatedParams.id, name)
            res.status(200).json(updatedGrade);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deleteGrade(req, res) {
        try {
            const grade = await gradeServices.deleteGrade(req.validatedParams.id)
            res.status(200).json(grade)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }

    },

}

module.exports = gradeController