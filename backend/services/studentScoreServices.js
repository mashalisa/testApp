const {StudentScore, Question, Answer, StudentAnswer, StudentTest} = require('../models')



const getAllScoresByStudent = async (id) => {
  const scores = await StudentScore.findAll({ where: { student_id: id } })
  if (!scores) {
    throw new Error('scores not fount')
  }
  return scores
}

const getAllScoresByTestId = async (id) => {
  const scores = await StudentScore.findAll({ where: { test_id: id } })
  if (!scores) {
    throw new Error('scores not fount')
  }
  return scores
}

const createScoreByTestIDByStudentID = async (test_id, student_id) => {

  const questions = await Question.findAll({ where: { test_id }, attributes: ['id'] })

  if (!questions) {
    throw new Error('no questions found for this test')
  }

  let correctCount = 0;
  

  const studentTest = await StudentTest.findOne({
      where: { user_id: student_id, test_id }
    })
    if(!studentTest) {
         throw new Error('Student test entry not found')
    }
  for (const question of questions) {
    const studentAnswer = await StudentAnswer.findOne({
      where: { studentTest_id: studentTest.id, question_id: question.id }
    })
    if (!studentAnswer) continue
    const isCorrect = await Answer.findOne({
      where: { id: studentAnswer.chosenAnswer_id, correctAnswer: true }
    })

    if (isCorrect) correctCount++
  }

  const totalQuestions = questions.length
  const score = (correctCount / totalQuestions) * 100
  let existingScore = await StudentScore.findOne({
    where: { test_id, student_id, }
  })
  if (existingScore) {
    await existingScore.update({ score })
  } else {
    existingScore = await StudentScore.create({ student_id, test_id, score, total_questions: totalQuestions, correct_answers: correctCount })
  }

  return {
    student_id, test_id, score, totalQuestions, correctCount
  }

}

const createStudentScore = async (data) => {

  const existingScore = await StudentScore.findOne({
    where: { student_id: data.student_id, test_id: data.test_id },
  })
  if (existingScore) {
    throw new Error('This student already has a score for this test')
  }

  const newScore = await StudentScore.create({
    student_id: data.student_id,
    test_id: data.test_id,
    score: data.score,
  })
  return newScore
}

const updateStudentScore = async (id, data) => {
  const scoreEntry = await StudentScore.findByPk(id)
  if (!scoreEntry) throw new Error('Score entry not found')

  const updatedScore = await scoreEntry.update({
    score: data.score ?? scoreEntry.score,
  })
  return updatedScore
}
const deleteStudentScore = async (id) => {
  const scoreEntry = await StudentScore.findByPk(id)
  if (!scoreEntry) throw new Error('Score entry not found')
  await scoreEntry.destroy()
  return 'Score deleted successfully'
}

module.exports = {
  deleteStudentScore,
  updateStudentScore,
  createStudentScore,
  getAllScoresByStudent,
  getAllScoresByTestId,
  createScoreByTestIDByStudentID
}
