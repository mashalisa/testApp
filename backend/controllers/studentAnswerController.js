const studentAnswerServices = require('../services/studentAnswerSevices')

const checkAnswer = async (req, res) => {
    try {
        const isCorrect = await studentAnswerServices.getCorrectAnswerByAnswerId(req.params.id)

        if (isCorrect) {
            res.status(200).json({
                correct: isCorrect
            })
        }
    }catch(error){
        res.status(404).json({
                correct: false,
                message: 'wrong answer'
            })
    }
   
}

const assingStudentAnswerToTestByName = async(req, res) => {
    try {
const answers = await studentAnswerServices.assingStudentAnswerToTestWithNames(req.params.testId,req.params.studentId, req.body)

            res.status(200).json({
                status: success,
                data: answers
            })
    }catch(error) {
           res.status(404).json({
                status: false,
                message: error.message
            })
    }
    
   
}

const assignStudentAnswerToTestByIds = async(req, res) => {
    try {
const answers = await studentAnswerServices.assingStudentAnswerToTestWithIds(req.params.testId,req.params.studentId, req.body)

            res.status(200).json({
                  success: true,
                data: answers
            })
    }catch(error) {
           res.status(404).json({
                  success: false,
                message: error.message
            })
    }
    
   
}

module.exports = { checkAnswer, assignStudentAnswerToTestByIds, assingStudentAnswerToTestByName };