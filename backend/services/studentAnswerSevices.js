const { StudentAnswer, Answer, StudentTest, Question } = require('../models')



const getCorrectAnswerByAnswerId = async (studentAnswerId) => {

    const studentAnswer = await StudentAnswer.findByPk(studentAnswerId, {
        include: [{
            model: Answer,
            attributes: ['id', 'correctAnswer']
        }]
    })

    if (!studentAnswer) {
        throw new Error('StudentAnswer not found');
    }
    if (!studentAnswer.Answer.correctAnswer) {
        throw new Error('Wrong answer');
    }
    return studentAnswer.Answer.correctAnswer;
}

module.exports = { getCorrectAnswerByAnswerId };

const assingStudentAnswerToTestWithNames = async (testId, studentId, answersArray) => {

    const studentTest = await StudentTest.findOne({ where: { test_id: testId, user_id: studentId } })

    if (!studentTest) {
        throw new Error('Student test not found for given IDs');
    }


    if (!answersArray || !Array.isArray(answersArray) || answersArray.length === 0) {
        throw new Error('Please provide answers');
    }
    const createdAnswers = [];
    for (const answerItem of answersArray) {
        if (!answerItem.answer || !answerItem.question) {
            throw new Error('Each answer item must include question and answer');
        }

        const answer = await Answer.findOne({ where: { name: answerItem.answer } })
        const question = await Question.findOne({ where: { name: answerItem.question } })


        if (!answer || !question) {
            throw new Error('Question or answer not found');
        }

        const studentAnswer = await StudentAnswer.create({
            studentTest_id: studentTest.id,
            chosenAnswer_id: answer.id,
            question_id: question.id,
        });

        createdAnswers.push(studentAnswer);

    }

    return createdAnswers
}

const assingStudentAnswerToTestWithIds = async (testId, studentId, answersArray) => {

    console.log(answersArray, 'answersArray')

    const studentTest = await StudentTest.findOne({ where: { test_id: testId, user_id: studentId } })

    if (!studentTest) {
        throw new Error('Student test not found for given IDs');
    }


    if (!answersArray || !Array.isArray(answersArray) || answersArray.length === 0) {
        throw new Error('Please provide answers');
    }
    const createdAnswers = [];
    console.log(answersArray, 'answersArray')
    for (const answerItem of answersArray) {
        const { question, answer } = answerItem;
        console.log(question, 'question')
        if (!answer || !question) {
            throw new Error('Each answer item must include question and answer');
        }

        const questionRecord = await Question.findByPk(question);
        console.log(questionRecord, 'questionRecord')

         if (!questionRecord) {
            throw new Error(`Question not found: ${question}`);
        }
        for (const answerId of answer) {
            
            const answerRecord = await Answer.findByPk(answerId);
            if (!answerRecord) {
                throw new Error(`Answer not found: ${answerId}`);
            }
            console.log(studentTest.id, 'studentTest.id')
            console.log(answerRecord.id, 'answerRecord.id')
             console.log(questionRecord.id, 'questionRecord.id')
              const studentAnswer = await StudentAnswer.create({
            studentTest_id: studentTest.id,
            chosenAnswer_id: answerRecord.id,
            question_id: questionRecord.id,
        });

        createdAnswers.push(studentAnswer);
        }
        


       

      

    }

    return createdAnswers
}


module.exports = {
    assingStudentAnswerToTestWithNames, getCorrectAnswerByAnswerId, assingStudentAnswerToTestWithIds
}