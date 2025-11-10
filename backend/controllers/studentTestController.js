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
    async getAllTestsByCurrentStudentId(req, res) {
        try {
            const { studentId } = req.params;
            const authenticatedUserId = req.user.id;
            if (studentId !== authenticatedUserId) {
                return res.status(403).json({
                    success: false,
                    error: "Access denied — you can only view your own tests"
                });
            }
            const tests = await studentTestService.getAllTestsByCurrentStudent(studentId)
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

    async createNewTestCurrentStudent(req, res) {
        try {
            const {studentId, testId} = req.params
            const authenticatedUserId  = req.user.id
            if(studentId !== authenticatedUserId) {
               return   res.status(403).json({
                success: false,
                error: "Access denied — you can only make your own tests"
            })
            }
            const entry = await studentTestService.createNewTestByStudent(testId, studentId, req.body)
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
        async updateTestCurrentStudent(req, res) {
            const {studentId, testId} = req.params
            const authenticatedUserId  = req.user.id
            if(studentId !== authenticatedUserId) {
                return  res.status(403).json({
                success: false,
                error: "Access denied — you can only update your own tests"
            })
            }
        try {
            const entry = await studentTestService.updateStudentTest(testId, studentId, req.body)
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