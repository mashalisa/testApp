const studentScoreServices = require('../services/studentScoreServices')

const studentScoreController = {
    async getAllScoresByStudent(req, res) {
        try {
            const scores = await studentScoreServices.getAllScoresByStudent(req.params.student_id)
            res.status(200).json({
                success: true,
                data: scores
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }

    },
    async getAllScoresByCurrentStudent(req, res) {
        try {
            const { student_id } = req.params;
            const authenticatedUserId = req.user.id;

            if (student_id !== authenticatedUserId) {
                return res.status(403).json({
                    success: false,
                    error: "Access denied — you can only view your own scores"
                });
            }
            const scores = await studentScoreServices.getAllScoresByStudent(student_id)
            res.status(200).json({
                success: true,
                data: scores
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }

    },
    async createStudentScore(req, res) {
        try {
            const newScoreEnter = await studentScoreServices.createStudentScore(req.body)
            res.status(201).json({
                success: true,
                data: newScoreEnter
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }

    },
    async createScoreByTestIDByStudentID(req, res) {
        try {
            const newScoreEnter = await studentScoreServices.createScoreByTestIDByStudentID(req.params.test_id, req.params.student_id,)
            res.status(201).json({
                success: true,
                data: newScoreEnter
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    },
    async updateStudentScore(req, res) {
        try {
            const updatedScore = await studentScoreServices.updateStudentScore(req.params.id, req.body)
            res.status(200).json({
                success: true,
                data: updatedScore
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    },
    async deleteStudentScore(req, res) {
        try {
            const deletedScore = await studentScoreServices.deleteStudentScore(req.params.id)
            res.status(200).json({
                success: true,
                data: deletedScore
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    }

}

module.exports = studentScoreController