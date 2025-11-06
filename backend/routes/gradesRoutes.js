// npm install swagger-ui-express swagger-jsdoc

const gradesController = require('../controllers/gradeController')

const {authenticateToken, isAdminTeacher} = require('../middleware/authMiddleware')

const express = require('express')

const router = express.Router();

router.get('/by-name', authenticateToken, isAdminTeacher,
    gradesController.getGradeByName)
router.get('/', authenticateToken, isAdminTeacher,
    gradesController.getAllGrades)
router.get('/:id', authenticateToken, isAdminTeacher,
    gradesController.getGradeByID)
router.post('/', authenticateToken, isAdminTeacher,
    gradesController.createGrade)
router.put('/:id', authenticateToken, isAdminTeacher,
    gradesController.updateGrade)
router.delete('/:id', authenticateToken, isAdminTeacher,
    gradesController.deleteGrade)

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Grade:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the Grade
 *         name:
 *           type: string
 *           description:  name of the grade
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
 * tags:
 *   name: Grades
 *   description: Grade management API
 */


/**
 * @swagger
 * /api/grades:
 *   get:
 *     summary: Returns all grades
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: The list of grades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *
 *   post:
 *     summary: Create a new Grade
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       201:
 *         description: The Grade was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/grades/{id}:
 *   get:
 *     summary: Get a grade by ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Grade ID
 *     responses:
 *       200:
 *         description: The Grade data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Grade not found
 *   put:
 *     summary: Update a Grade by ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Grade ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       200:
 *         description: Grade updated
 *       404:
 *         description: Grade not found
 *
 *   delete:
 *     summary: Delete a Grade by ID
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Grade ID
 *     responses:
 *       200:
 *         description: Grade deleted
 *       404:
 *         description: Grade not found
 */

/**
 * @swagger
 * /api/grades/by-name:
 *   get:
 *     summary: Get a grade by name
 *     tags: [Grades]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Grade name
 *     responses:
 *       200:
 *         description: Grade found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       404:
 *         description: Grade not found
 */