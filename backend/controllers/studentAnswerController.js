const studentAnswerServices = require('../services/studentAnswerSevices')

const checkAnswer = async (req, res) => {
    try {
        const isCorrect = await studentAnswerServices.getCorrectAnswerByAnswerId(req.validatedParams.id)

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
const answers = await studentAnswerServices.assingStudentAnswerToTestWithNames(req.validatedParams.testId,req.validatedParams.studentId, req.validatedBody)

            res.status(200).json({
                success: true,
                data: answers
            })
    }catch(error) {
           res.status(404).json({
                status: false,
                message: error.message
            })
    }
    
   
}
const assingCurrentStudentAnswerToTestByName = async(req, res) => {
    try {
         const { studentId, testId } = req.validatedParams;
            const authenticatedUserId = req.user.id;


    if (studentId !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        error: "Access denied — you can only view your own tests"
      });
    }
const answers = await studentAnswerServices.assingStudentAnswerToTestWithNames(testId,studentId, req.validatedBody)

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
const assignStudentAnswerToTestByIds = async(req, res) => {
    try {
const answers = await studentAnswerServices.assingStudentAnswerToTestWithIds(req.validatedParams.testId,req.validatedParams.studentId, req.validatedBody)

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
const assignCurrentStudentAnswerToTestByIds = async(req, res) => {
    try {
        const { studentId, testId } = req.validatedParams;
    const authenticatedUserId = req.user.id;
console.log("studentId:", studentId, typeof studentId, studentId.length);
console.log("authUserId:", authenticatedUserId, typeof authenticatedUserId, authenticatedUserId.length);
console.log("equal:", studentId === authenticatedUserId);

   if (studentId.trim() !== authenticatedUserId.trim()) {
      return res.status(403).json({
        success: false,
        error: "Access denied — you can only view your own tests"
      });
    }
const answers = await studentAnswerServices.assingStudentAnswerToTestWithIds(testId,studentId, req.validatedBody)

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
module.exports = { checkAnswer, assignCurrentStudentAnswerToTestByIds,assingCurrentStudentAnswerToTestByName, assignStudentAnswerToTestByIds, assingStudentAnswerToTestByName };