const express = require('express')
const studentScoreController = require('../controllers/studentScoreController')
const router = express.Router()  
const {authenticateToken, isAdminTeacher, isStudent} = require('../middleware/authMiddleware')

// console.log('Loaded studentScoreController:', studentScoreController);

router.get('/student/:student_id', 
    authenticateToken, 
    isAdminTeacher,
    studentScoreController.getAllScoresByStudent)
router.get('/student/:student_id/my-score', 
    authenticateToken, 
    isStudent,
    studentScoreController.getAllScoresByCurrentStudent)
    
router.post('/', authenticateToken, isAdminTeacher,
    studentScoreController.createStudentScore)
router.post('/calculate/:test_id/:student_id', authenticateToken, isAdminTeacher,
    studentScoreController.createScoreByTestIDByStudentID)
router.put('/:id', authenticateToken, isAdminTeacher,
    studentScoreController.updateStudentScore)
router.delete('/:id', authenticateToken, isAdminTeacher,
    studentScoreController.deleteStudentScore)

module.exports = router



/**
 * @swagger
 * tags:
 *   name: StudentScores
 *   description: Manage student test scores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentScore:
 *       type: object
 *       required:
 *         - student_id
 *         - test_id
 *         - score
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a24f97f0-7df3-4e64-b915-f12a9c4e89f3"
 *         student_id:
 *           type: string
 *           format: uuid
 *           example: "2d5e63d4-5e21-49c8-b1ff-3ccf2a66a2bb"
 *         test_id:
 *           type: string
 *           format: uuid
 *           example: "4a5e13f4-b7a3-4c65-812f-2df9ef0c53f1"
 *         score:
 *           type: number
 *           example: 87
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /student-scores/student/{student_id}:
 *   get:
 *     summary: Get all test scores for a specific student
 *     tags: [StudentScores]
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         description: UUID of the student
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of test scores for the student
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
 *                     $ref: '#/components/schemas/StudentScore'
 *       404:
 *         description: No scores found for this student
 */

/**
 * @swagger
 * /student-scores/student/{student_id}/my-score:
 *   get:
 *     summary: Get all test scores for a specific student
 *     tags: [StudentScores]
 *     parameters:
 *       - in: path
 *         name: student_id
 *         required: true
 *         description: UUID of the student
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of test scores for the student
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
 *                     $ref: '#/components/schemas/StudentScore'
 *       404:
 *         description: No scores found for this student
 */

/**
 * @swagger
 * /student-scores:
 *   post:
 *     summary: Manually create a new score for a student
 *     tags: [StudentScores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentScore'
 *     responses:
 *       201:
 *         description: Score created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/StudentScore'
 *       400:
 *         description: Missing or invalid data
 */

/**
 * @swagger
 * /student-scores/calculate/{test_id}/{student_id}:
 *   post:
 *     summary: Automatically calculate and create (or update) a score for a student in a test
 *     tags: [StudentScores]
 *     parameters:
 *       - in: path
 *         name: test_id
 *         required: true
 *         description: UUID of the test
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: student_id
 *         required: true
 *         description: UUID of the student
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       201:
 *         description: Score calculated and saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/StudentScore'
 *       500:
 *         description: Error calculating the score
 */

/**
 * @swagger
 * /student-scores/{id}:
 *   put:
 *     summary: Update a student's score record
 *     tags: [StudentScores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the score record
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentScore'
 *     responses:
 *       200:
 *         description: Score updated successfully
 *       404:
 *         description: Score record not found
 */

/**
 * @swagger
 * /student-scores/{id}:
 *   delete:
 *     summary: Delete a student's score record
 *     tags: [StudentScores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID of the score record
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Score deleted successfully
 *       404:
 *         description: Score not found
 */
