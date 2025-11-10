const questionController = require('../controllers/questionController')
const {authenticateToken, isAdminTeacher} = require('../middleware/authMiddleware')
const express = require('express')

const router = express.Router()

router.get('/', 
    authenticateToken, 
    isAdminTeacher,
    questionController.getAllQuestions)
router.get('/:id', 
    authenticateToken,
     isAdminTeacher,
    questionController.getQuestionByID)
router.get('/test/:testId', 
    authenticateToken, 
    isAdminTeacher,
    questionController.getQuestionByTestId)
router.put('/:id', 
    authenticateToken, 
    isAdminTeacher,
    questionController.updateQuestion)
router.delete('/:id', 
    authenticateToken, 
    isAdminTeacher,
    questionController.deleteQuestion)
router.post('/test/:testId', 
    authenticateToken, 
    isAdminTeacher,
    questionController.createNewQuestion)

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - name
 *         - test_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the Question
 *         name:
 *           type: string
 *           description: Full name of the Question
 *         test_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the related Test
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
 * /api/questions:
 *   get:
 *     summary: Returns all Questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: The list of Question
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *
 */

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Get a Question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Question ID
 *     responses:
 *       200:
 *         description: The Question data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update a Question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
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
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a Question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Question ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/questions/test/{testId}:
 *   get:
 *     summary: Get a Questions by test id
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: testId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The test ID
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
 *     summary: Create a new Question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: testId
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
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "find procentage of the number:  10% of 70"
 *     responses:
 *       201:
 *         description: The Question was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Server error
*/
