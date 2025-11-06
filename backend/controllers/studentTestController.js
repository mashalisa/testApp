const studentTestService = require('../services/studentTestServices')

const studentTestController = {
    async getAllStudentsByTestId(req, res) {
        try {
            const students = await studentTestService.getAllStudentsByTestId(req.params.testId)
            res.status(200).json({
                success: true,
                data: students
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    },
    async getAllTestsByStudentId(req, res) {
        try {
            const tests = await studentTestService.getAllTestsByStudent(req.params.studentId)
            res.status(200).json({
                success: true,
                data: tests
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    },

    async createNewTestStudent(req, res) {
        try {
            const entry = await studentTestService.createNewTestByStudent(req.params.testId, req.params.studentId, req.body)
            res.status(201).json({
                success: true,
                data: entry
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }

    },


    async updateTestStudent(req, res) {
        try {
            const entry = await studentTestService.updateStudentTest(req.params.testId, req.params.studentId, req.body)
            res.status(200).json({
                success: true,
                data: entry
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    },
    async deleteStudentTest(req, res) {
        try {
            const entry = await studentTestService.deleteStudentTest(req.params.id)
            res.status(200).json({
                success: true,
                data: entry
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    }
}

module.exports = studentTestController