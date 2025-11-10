const studentAnswerController  = require('../controllers/studentAnswerController')

const express = require('express')

const router = express.Router()

const {authenticateToken, isAdminTeacher, isStudent} = require('../middleware/authMiddleware')

router.post('/by-name/student/:studentId/test/:testId', 
    authenticateToken, 
    isAdminTeacher,
    studentAnswerController.assingStudentAnswerToTestByName)

router.post('/by-name/student/:studentId/test/:testId/submit', 
    authenticateToken, 
    isStudent,
    studentAnswerController.assingCurrentStudentAnswerToTestByName)

router.post('/by-id/student/:studentId/test/:testId', 
      authenticateToken, isAdminTeacher,
      studentAnswerController.assignStudentAnswerToTestByIds)

router.post('/by-id/student/:studentId/test/:testId/submit', 
      authenticateToken,
       isStudent,
      studentAnswerController.assignCurrentStudentAnswerToTestByIds)
      
router.get('/:id',   authenticateToken, isAdminTeacher,
    studentAnswerController.checkAnswer)

module.exports = router;


/**
 * @swagger
 * /testAnswers/by-name/student/{studentId}/test/{testId}:
 *   post:
 *     summary: Assign student answers to a test (using question and answer names)
 *     tags: [StudentAnswers]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the student
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - question
 *                 - answer
 *               properties:
 *                 question:
 *                   type: string
 *                   example: "What is the capital of France?"
 *                 answer:
 *                   type: string
 *                   example: "Paris"
 *     responses:
 *       200:
 *         description: Successfully assigned answers to test by name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudentAnswer'
 *       400:
 *         description: Missing or invalid question/answer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Question or answer not found"
 */


/**
 * @swagger
 * /testAnswers/by-name/student/{studentId}/test/{testId}/submit:
 *   post:
 *     summary: Assign student answers to a test (using question and answer names)
 *     tags: [StudentAnswers]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the student
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - question
 *                 - answer
 *               properties:
 *                 question:
 *                   type: string
 *                   example: "What is the capital of France?"
 *                 answer:
 *                   type: string
 *                   example: "Paris"
 *     responses:
 *       200:
 *         description: Successfully assigned answers to test by name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudentAnswer'
 *       400:
 *         description: Missing or invalid question/answer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Question or answer not found"
 */

/**
 * @swagger
 * /testAnswers/by-id/student/{studentId}/test/{testId}:
 *   post:
 *     summary: Assign student answers to a test (using question and answer names)
 *     tags: [StudentAnswers]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the student
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - question
 *                 - answer
 *               properties:
 *                 question:
 *                   type: string
 *                   example: "What is the capital of France?"
 *                 answer:
 *                   type: string
 *                   example: "Paris"
 *     responses:
 *       200:
 *         description: Successfully assigned answers to test by name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudentAnswer'
 *       400:
 *         description: Missing or invalid question/answer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Question or answer not found"
 */


/**
 * @swagger
 * /testAnswers/by-id/student/{studentId}/test/{testId}/submit:
 *   post:
 *     summary: Assign student answers to a test (using question and answer names)
 *     tags: [StudentAnswers]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the student
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the test
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - question
 *                 - answer
 *               properties:
 *                 question:
 *                   type: string
 *                   example: "What is the capital of France?"
 *                 answer:
 *                   type: string
 *                   example: "Paris"
 *     responses:
 *       200:
 *         description: Successfully assigned answers to test by name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StudentAnswer'
 *       400:
 *         description: Missing or invalid question/answer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Question or answer not found"
 */


/**
 * @swagger
 * /testAnswers/{id}:
 *   get:
 *     summary: Check if a student's selected answer is correct
 *     tags: [StudentAnswers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the StudentAnswer record
 *     responses:
 *       200:
 *         description: Indicates whether the answer is correct
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 correct:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "correct"
 *       404:
 *         description: Student answer not found or incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 correct:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "wrong answer"
 */
