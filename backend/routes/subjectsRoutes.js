// npm install swagger-ui-express swagger-jsdoc

const subjectController = require('../controllers/subjectController')
const { authenticateToken, isAdminTeacher } = require('../middleware/authMiddleware')
const express = require('express')

const router = express.Router();

const Joi = require('joi')
const { validate, validateParams, validateQuery } = require('../middleware/validate')

const questionSchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    grade_id: Joi.string().uuid().required(),
    coreSubject_id: Joi.string().uuid().required(),
});
const questionUpdateSchema = Joi.object({
    name: Joi.string().trim().min(1).optional(),
    grade_id: Joi.string().uuid().optional(),
    coreSubject_id: Joi.string().uuid().optional(),
    subject_id: Joi.string().uuid().optional(),
});
const questionQuerySchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
});
const questionParamsIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});
const teacherParamsIdSchema = Joi.object({
    teacherId: Joi.string().uuid().required(),
});

const teacherSubjectSchema = Joi.object({
    subjectsData: Joi.array().items(Joi.string()).required()
});



router.get('/by-name',
    authenticateToken,
    isAdminTeacher,
    validateQuery(questionQuerySchema),
    subjectController.getSubjectByName)
router.get('/', authenticateToken, isAdminTeacher,
    subjectController.getAllSubject)
router.get('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(questionParamsIdSchema),
    subjectController.getSubjectByID)
router.post('/',
    authenticateToken,
    isAdminTeacher,
    validate(questionSchema),
    subjectController.createSubject)
router.put('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(questionParamsIdSchema),
    validate(questionUpdateSchema),
    subjectController.updateSubject)
router.delete('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(questionParamsIdSchema),
    subjectController.deleteSubject)
router.put('/teacher/:teacherId',
    authenticateToken,
    isAdminTeacher,
    validateParams(teacherParamsIdSchema),
     validate(teacherSubjectSchema),
    subjectController.assignSubjectsToTeacher)
module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the  Subject
 *         name:
 *           type: string
 *           description:  name of the  Subject
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
 *   name: Subject
 *   description: Subject management API
 */


/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Returns all  Subjects
 *     tags: [Subject]
 *     responses:
 *       200:
 *         description: The list of  Subjects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *
 *   post:
 *     summary: Create a new  Subject
 *     tags: [Subject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - grade_id
 *               - coreSubject_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Midterm Exam"
 *               grade_id:
 *                 type: string
 *                 format: uuid
 *                 example: "c781cfa7-6a2e-4e19-8e2f-4875b745c81d"
 *               coreSubject_id:
 *                 type: string
 *                 format: uuid
 *                 example: "c781cfa7-6a2e-4e19-8e2f-4875b745c81d"
 *     responses:
 *       201:
 *         description: The  Subject was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get a Subject by ID
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The  Subject ID
 *     responses:
 *       200:
 *         description: The  Subject data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description:  Subject not found
 *   put:
 *     summary: Update a  Subject by ID
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The  Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - grade_id
 *               - coreSubject_id
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
 *               coreSubject_id:
 *                 type: string
 *                 format: uuid
 *                 example: "c781cfa7-6a2e-4e19-8e2f-4875b745c81d"
 *     responses:
 *       200:
 *         description:  Subject updated
 *       404:
 *         description:  Subject not found
 *
 *   delete:
 *     summary: Delete a Subject by ID
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The  Subject ID
 *     responses:
 *       200:
 *         description:  Subject deleted
 *       404:
 *         description:  Subject not found
 */

/**
 * @swagger
 * /api/subjects/by-name:
 *   get:
 *     summary: Get a  Subject by name
 *     tags: [Subject]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description:  Subject name
 *     responses:
 *       200:
 *         description:  Subject found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       404:
 *         description:  Subject not found
 */

/**
 * @swagger
 * /api/subjects/teacher/{teacherId}:
 *   put:
 *     summary: Assign  Subjects to a teacher
 *     tags: [Subject]
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
 *               - subjectsData
 *             properties:
 *               subjectsData:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of Subject IDs to assign
 *     responses:
 *       200:
 *         description: Subject assigned successfully
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
