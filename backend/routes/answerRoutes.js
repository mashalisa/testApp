const answerController = require('../controllers/answerController')
const { authenticateToken, isAdminTeacher } = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router();
const Joi = require('joi')
const { validate, validateParams } = require('../middleware/validate')

const answerSchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    correctAnswer: Joi.boolean().required()
});
const answersArraySchema = Joi.array().items(answerSchema).min(1);
const answerParamSchema = Joi.object({
    questionId: Joi.string().uuid().required(),
});
const answerParamIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});




router.get('/', authenticateToken, isAdminTeacher, answerController.getAllAnswers)
router.get('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(answerParamIdSchema),
    answerController.getAnswerById)
router.get('/questions/:questionId',
    authenticateToken,
    isAdminTeacher,
    validateParams(answerParamSchema),
    answerController.getAnswerByQuestionId)

router.put('/questions/:questionId',
    authenticateToken,
    isAdminTeacher,
    validateParams(answerParamSchema),
    validate(answersArraySchema),
    answerController.updateAnswer)

router.delete('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(answerParamIdSchema),
    answerController.deleteAnswer)

router.post('/questions/:questionId',
    authenticateToken,
    isAdminTeacher,
    validateParams(answerParamSchema),
    validate(answersArraySchema),
    answerController.createNewAnswer)

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - name
 *         - question_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the Answer
 *         name:
 *           type: string
 *           description: Text of the answer
 *         question_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the related Question   # <-- fixed indentation here
 *         correctAnswer:
 *           type: boolean
 *           description: Whether this is the correct answer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */

/**
 * @swagger
 * /api/answers:
 *   get:
 *     summary: Returns all answers
 *     tags: [Answers]
 *     responses:
 *       200:
 *         description: The list of answers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 *
 */

/**
 * @swagger
 * /api/answers/{id}:
 *   get:
 *     summary: Get a answer by ID
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The answer ID
 *     responses:
 *       200:
 *         description: The answers data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a Answer by ID
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Answer ID
 *     responses:
 *       200:
 *         description: Answer deleted
 *       404:
 *         description: Answer not found
 */

/**
 * @swagger
 * /api/answers/questions/{questionId}:
 *   get:
 *     summary: Get a Answers by question id
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The question ID
 *     responses:
 *       200:
 *         description: The Questions data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: No questions found for the given test
 * 
 * 
 *   post:
 *     summary: Create one or more Answers for a Question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - correctAnswer
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "7"
 *                 correctAnswer:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       201:
 *         description: The answer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Server error
 * 
 * 
 *   put:
 *     summary: Create one or more Answers for a Question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - correctAnswer
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "7"
 *                 correctAnswer:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       201:
 *         description: The answer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Server error
*/
