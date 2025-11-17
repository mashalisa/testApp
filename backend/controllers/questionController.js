const questionService = require('../services/questionServices')

const questionController = {
    async getQuestionByID(req, res) {
        try {
            const question = await questionService.getQuestionById(req.validatedParams.id)
            res.status(200).json({
                success:true,
                data:question
            })
        }catch(error){
                res.status(404).json({
                success:false,
                 message: error.message,
            })
        }
    },
       async getQuestionByTestId(req, res) {
        try {
            const questions = await questionService.getQuestionByTestId(req.validatedParams.testId)
            res.status(200).json({
                success:true,
                data:questions
            })
        }catch(error){
                res.status(404).json({
                success:false,
                 message: error.message,
            })
        }
    },
        async getAllQuestions(req, res) {
        try {
            const questions = await questionService.getAllQustions()
            res.status(200).json({
                success:true,
                data:questions
            })
        }catch(error){
                res.status(500).json({
                success:false,
                 message: error.message,
            })
        }
    },
    async createNewQuestion(req, res) {
        try {
            const question = await questionService.createQuestion(req.validatedParams.testId, req.validatedBody)
            res.status(201).json({
                success:true,
                data:question
            })
        }catch(error){
                res.status(400).json({
                success:false,
                 message: error.message,
            })
        }
    },
        async updateQuestion(req, res) {
        try {
            const updatedQuestion = await questionService.updateQuestionById(req.validatedParams.id, req.validatedBody)
            res.status(200).json({
                success:true,
                data:updatedQuestion,
                
            })
        }catch(error){
                res.status(400).json({
                success:false,
                 message: error.message,
            })
        }
    },
            async deleteQuestion(req, res) {
        try {
            const deletedQuestion = await questionService.deleteQuestionById(req.validatedParams.id)
            res.status(200).json({
                success:true,
                data:deletedQuestion
            })
        }catch(error){
                res.status(404).json({
                success:false,
                 message: error.message,
            })
        }
    }
}


module.exports = questionController