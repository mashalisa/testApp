// npm install swagger-ui-express swagger-jsdoc

const coreSubjectController = require('../controllers/coreSubjectController')
const { authenticateToken, isAdminTeacher, isStudent } = require('../middleware/authMiddleware')
const express = require('express')

const router = express.Router();
const Joi = require('joi')
const { validate, validateQuery, validateParams } = require('../middleware/validate')

const coreSubject = Joi.object({
    name: Joi.string().trim().min(1).required(),
    grade_id: Joi.string().uuid().required()
});
const coreSubjectNameSchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
});

const coreSubjectParamSchema = Joi.object({
    id: Joi.string().uuid().required(),
});

const coreSubjectsTeacherSchema = Joi.object({
    coreSubjectsData: Joi.array().items(Joi.string()).required()
});
const coreSubjectsTeacherParamSchema = Joi.object({
    teacherId: Joi.string().uuid().required(),
});
router.get('/by-name',
    authenticateToken,
    isAdminTeacher,
    validateQuery(coreSubjectNameSchema),
    coreSubjectController.getCoreSubjectByName)

router.get('/', authenticateToken, isAdminTeacher,
    coreSubjectController.getAllCoreSubject)
router.get('/:id',
    authenticateToken,
    validateParams(coreSubjectParamSchema),
    coreSubjectController.getCoreSubjectByID)

router.post('/',
    authenticateToken,
    isAdminTeacher,
    validate(coreSubject),
    coreSubjectController.createCoreSubject)

router.put('/teacher/:teacherId',
    authenticateToken,
    isAdminTeacher,
    validateParams(coreSubjectsTeacherParamSchema),
    validate(coreSubjectsTeacherSchema),
    coreSubjectController.assignCoreSubjectsToTeacher)
router.put('/:id',
    authenticateToken,
    isAdminTeacher,
    validate(coreSubject),
    validateParams(coreSubjectParamSchema),
    coreSubjectController.updateCoreSubject)
router.delete('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(coreSubjectParamSchema),
    coreSubjectController.deleteCoreSubject)




module.exports = router;

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     CoreSubject:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the Core Subject
 *         name:
 *           type: string
 *           description:  name of the Core Subject
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
 *   name: CoreSubject
 *   description: CoreSubject management API
 */


/**
 * @swagger
 * /api/coreSubjects:
 *   get:
 *     summary: Returns all Core Subjects
 *     tags: [CoreSubject]
 *     responses:
 *       200:
 *         description: The list of Core Subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CoreSubject'
 *
 *   post:
 *     summary: Create a new Core Subject
 *     tags: [CoreSubject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - grade_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Midterm Exam"
 *               grade_id:
 *                 type: string
 *                 format: uuid
 *                 example: "c781cfa7-6a2e-4e19-8e2f-4875b745c81d"
 *     responses:
 *       201:
 *         description: The Core Subject was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoreSubject'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/coreSubjects/{id}:
 *   get:
 *     summary: Get a CoreSubject by ID
 *     tags: [CoreSubject]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Core Subject ID
 *     responses:
 *       200:
 *         description: The Core Subject data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoreSubject'
 *       404:
 *         description: Core Subject not found
 *   put:
 *     summary: Update a Core Subject by ID
 *     tags: [CoreSubject]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Core Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - grade_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Midterm Exam"
 *               text_URL:
 *                 type: string
 *                 example: "https://www.exam.com/math/algebra/123"
 *               grade_id:
 *                 type: string
 *                 format: uuid
 *                 example: "c781cfa7-6a2e-4e19-8e2f-4875b745c81d"
 *     responses:
 *       200:
 *         description: Core Subject updated
 *       404:
 *         description: Core Subject not found
 *
 *   delete:
 *     summary: Delete a Core Subject by ID
 *     tags: [CoreSubject]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Core Subject ID
 *     responses:
 *       200:
 *         description: Core Subject deleted
 *       404:
 *         description: Core Subject not found
 */

/**
 * @swagger
 * /api/coreSubjects/by-name:
 *   get:
 *     summary: Get a Core Subject by name
 *     tags: [CoreSubject]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Core Subject name
 *     responses:
 *       200:
 *         description: Core Subject found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoreSubject'
 *       404:
 *         description: Core Subject not found
 */

/**
 * @swagger
 * /api/coreSubjects/teacher/{teacherId}:
 *   put:
 *     summary: Assign core Subjects to a teacher
 *     tags: [CoreSubject]
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
 *               - coreSubjectsData
 *             properties:
 *               coreSubjectsData:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of grade IDs to assign
 *     responses:
 *       200:
 *         description: core ubjects assigned successfully
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
 *         description: Teacher or core Subjects not found
 */
