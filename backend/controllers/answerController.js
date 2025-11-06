const answerServices = require('../services/answerServices')

const answerController = {
    async getAllAnswers(req, res) {
        try {
            const answers = await answerServices.getAllAnswers();
            res.status(200).json({
                success: true,
                data: answers
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }

    },
    async getAnswerById(req, res) {
        try {
            const answer = await answerServices.getAnswerById(req.params.id);
            res.status(200).json({
                success: true,
                data: answer
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }

    },
        async getAnswerByQuestionId(req, res) {
        try {
            const answers = await answerServices.getAnswersByQuestionId(req.params.questionId);
            res.status(200).json({
                success: true,
                data: answers
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }

    },
    async createNewAnswer(req, res) {
        try {
            const answer = await answerServices.createAnswer(req.params.questionId, req.body);
            res.status(201).json({
                success: true,
                data: answer
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }

    },
    async updateAnswer(req, res) {
        try {
            const updatedAnswer = await answerServices.updateAnswerById(req.params.questionId, req.body);
            res.status(200).json({
                success: true,
                data: updatedAnswer
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }

    },
    async deleteAnswer(req, res) {
        try {
            const deletedAnswer = await answerServices.deleteAnswerById(req.params.id);
            res.status(200).json({
                success: true,
                data: deletedAnswer
            })
        } catch (error) {
            res.status(404).json({
                success: false,
                error: error.message
            })
        }

    },


}

module.exports = answerController