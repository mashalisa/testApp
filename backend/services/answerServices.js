const {Answer, Question} = require('../configDB/models')

const getAllAnswers = async() => {
    const answers = await Answer.findAll()
    if(!answers || answers.length === 0) {
        throw new Error ('answers not found')
    }
    return answers
}
const getAnswerById = async(id) => {
    const answer = await Answer.findByPk(id)
    if(!answer ) {
        throw new Error ('answers not found')
    }

    return answer
}

const getAnswersByQuestionId = async(questionId) => {
    const answers = await Question.findAll(id)
    if(!answers ) {
        throw new Error ('answers not found')
    }

    return answers
}

const createAnswer = async(questionId, answersArray) => {

 
    const question = await Question.findByPk(questionId)
    if(!question) {
         throw new Error ('question not found')
    }

    if (!Array.isArray(answersArray) || answersArray.length === 0) {
    throw new Error('Answers array is required');
  }
    
  
const createdAnswers = []
    for (const answerData of answersArray) {
        const { name, correctAnswer } = answerData;
          if (!name || correctAnswer === undefined) {
      throw new Error('Missing name or correctAnswer for an answer');
    }

     const exists = await Answer.findOne({
      where: { name, question_id: questionId },
    });
    if (exists) {
      throw new Error(`Answer "${name}" already exists for this question`);
    }
      const newAnswer = await Answer.create({
      name,
      correctAnswer,
      question_id: questionId,
    });
    createdAnswers.push(newAnswer);
    }

    return createdAnswers
}

const updateAnswerById = async(questionId, answersArray) => {
 const question = await Question.findByPk(questionId);
  if (!question) throw new Error('Question not found');

  if (!Array.isArray(answersArray) || answersArray.length === 0) {
    throw new Error('Answers array is required');
  }

  // Remove old answers
  await Answer.destroy({ where: { question_id: questionId } });

const createdAnswers = []
    for (const answerData of answersArray) {
        const { name, correctAnswer } = answerData;
          if (!name || correctAnswer === undefined) {
      throw new Error('Missing name or correctAnswer for an answer');
    }

      const newAnswer = await Answer.create({
      name,
      correctAnswer,
        question_id: questionId
    });
    createdAnswers.push(newAnswer);
    }

    return createdAnswers
}

const deleteAnswerById = async(id) => {
    const answer = await Answer.findByPk(id)
    if(!answer ) {
        throw new Error ('answers not found')
    }
    await answer.destroy()
    return 'answer was deleted successfuly'
}

module.exports = {
    deleteAnswerById,updateAnswerById, createAnswer, getAnswerById, getAllAnswers,getAnswersByQuestionId
}