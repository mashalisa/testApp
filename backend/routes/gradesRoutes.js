// npm install swagger-ui-express swagger-jsdoc

const gradesController = require('../controllers/gradeController')

const { authenticateToken, isAdminTeacher, isStudent } = require('../middleware/authMiddleware')

const express = require('express')

const router = express.Router();

const Joi = require('joi')
const { validate, validateParams, validateQuery } = require('../middleware/validate')

const gradeSchema = Joi.object({
    name: Joi.string().trim().min(1).required()
});
const gradeTeacherSchema = Joi.object({
    gradesData: Joi.array().items(Joi.string()).required()
});
const gradeParamSchema = Joi.object({
    id: Joi.string().uuid().required(),
    teacherId: Joi.string().uuid().required(),
});
const gradeIdParamSchema = Joi.object({
    id: Joi.string().uuid().required()

});
const gradeTeacherParamSchema = Joi.object({
    teacherId: Joi.string().uuid().required(),
});
const gradeQuerySchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
});



router.get('/by-name', 
    authenticateToken, 
    isAdminTeacher,
    validateQuery(gradeQuerySchema),
    gradesController.getGradeByName)
router.get('/', authenticateToken, isAdminTeacher,
    gradesController.getAllGrades)
router.get('/:id',
    authenticateToken,
    validateParams(gradeIdParamSchema),
    gradesController.getGradeByID)
router.post('/',
    authenticateToken,
    isAdminTeacher,
    validate(gradeSchema),
    gradesController.createGrade)
router.put('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(gradeParamSchema),
    validate(gradeSchema),
    gradesController.updateGrade)
router.delete('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(gradeParamSchema),
    gradesController.deleteGrade)
router.put('/teacher/:teacherId',
    authenticateToken,
    isAdminTeacher,
    validateParams(gradeTeacherParamSchema),
     validate(gradeTeacherSchema),
    gradesController.assignGradesToTeacher)
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

/**
 * @swagger
 * /api/grades/teacher/{teacherId}:
 *   put:
 *     summary: Assign grades to a teacher
 *     tags: [Grades]
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The teacher's UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gradesData
 *             properties:
 *               gradesData:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of grade IDs to assign
 *     responses:
 *       200:
 *         description: Grades assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: Teacher or grade not found
 */
