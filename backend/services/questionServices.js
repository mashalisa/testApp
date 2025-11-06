const { Question, Test } = require('../configDB/models')


const getAllQustions = async () => {
    const questions = await Question.findAll();
    if (!questions || questions.length === 0) {
        throw new Error('questions not found')
    }
    return questions
}

const getQuestionById = async (id) => {
    const question = await Question.findByPk(id)
    if (!question) {
        throw new Error('question not found')
    }
    return question
}


const getQuestionByTestId = async (testId) => {
    console.log(testId, 'testId')
    const questions = await Question.findAll({ where: { test_id: testId } })
    if (!questions) {
        throw new Error('question not found')
    }
    return questions
}



const createQuestion = async (testId, dataQuestion) => {
   
        if (!dataQuestion.name || !testId) {
        throw new Error('missing data')
    }
    const test = await Test.findByPk(testId)
    if (!test) {
        throw new Error('test not found')
    }
    const existingQuestion = await Question.findOne({ where: { name: dataQuestion.name, test_id: testId } })
    if (existingQuestion) {
        throw new Error('this question already exists')
    }



    const newQuestion = await Question.create({
        name: dataQuestion.name,
        test_id: testId
    })
    return newQuestion
}

const updateQuestionById = async (id, dataQuestion) => {
    const question = await Question.findByPk(id)
    if (!question) {
        throw new Error('question not found')
    }
    const updatedQuestion = await question.update({
        name: dataQuestion.name ?? question.name
    });
    return updatedQuestion
}

const deleteQuestionById = async (id) => {
    const question = await Question.findByPk(id)
    if (!question) {
        throw new Error('question not found')
    }
    await question.destroy()

    return 'The question was successfully deleted';
}

module.exports = {
    deleteQuestionById, updateQuestionById, createQuestion, getQuestionById, getAllQustions, getQuestionByTestId
}