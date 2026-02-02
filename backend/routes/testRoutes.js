const testController = require('../controllers/testController')

const express = require('express');
const router = express.Router()
const { authenticateToken, isAdminTeacher, isStudent } = require('../middleware/authMiddleware')

const Joi = require('joi')
const { validate, validateParams } = require('../middleware/validate')

const testSchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    grade_id: Joi.string().uuid().required(),
    coreSubject_id: Joi.string().uuid().required(),
    subject_id: Joi.string().uuid().required(),
    text_URL:Joi.string().optional()
});
const testUpdateSchema = Joi.object({
    name: Joi.string().trim().min(1).optional(),
    grade_id: Joi.string().uuid().optional(),
    coreSubject_id: Joi.string().uuid().optional(),
    subject_id: Joi.string().uuid().optional(),
    test_URL:Joi.string().optional()
});
const paramsTecherIdSchema = Joi.object({
    teacherId: Joi.string().uuid().required(),
});
const paramsTestIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});



router.get('/', authenticateToken, isAdminTeacher,
    testController.getAllTest);
router.get('/:id',
    authenticateToken,
    isAdminTeacher,
    validateParams(paramsTestIdSchema),
    testController.getTestById);
router.get('/:id/studentTest',
    authenticateToken,
    isStudent,
    validateParams(paramsTestIdSchema),
    testController.getTestById);
router.put('/:id',
    authenticateToken,
    isAdminTeacher,
     validateParams(paramsTestIdSchema),
    validate(testUpdateSchema),
    testController.updateTest);
router.delete('/:id', 
    authenticateToken, 
    isAdminTeacher,
     validateParams(paramsTestIdSchema),
    testController.deleteTest);
router.post('/:teacherId',
    authenticateToken,
    isAdminTeacher,
    validate(testSchema),
    validateParams(paramsTecherIdSchema),
    testController.createTest);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the test
 *         name:
 *           type: string
 *           description: Full name of the test
 *         test_URL:
 *           type: string
 *           description: test URL
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
 * /api/tests:
 *   get:
 *     summary: Get all tests
 *     tags: [Tests]
 *     responses:
 *       200:
 *         description: The list of tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 *
 */

/**
 * @swagger
 * /api/tests/{id}:
 *   get:
 *     summary: Get a Test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Test ID
 *     responses:
 *       200:
 *         description: The Test data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update a Test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Test ID
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
 *               - subject_id
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
 *               subject_id:
 *                 type: string
 *                 format: uuid
 *                 example: "c781cfa7-6a2e-4e19-8e2f-4875b745c81d"
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a Test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Test ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *   post:
 *     summary: Create a new Test
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The teacher ID
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
 *               - subject_id
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
 *               subject_id:
 *                 type: string
 *                 format: uuid
 *                 example: "c781cfa7-6a2e-4e19-8e2f-4875b745c81d"
 *     responses:
 *       201:
 *         description: The Test was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Related entity not found (Grade/CoreSubject/Subject/Teacher)
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/tests/{id}/studentTest:
 *   get:
 *     summary: Get a Test by ID
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Test ID
 *     responses:
 *       200:
 *         description: The Test data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 *       404:
 *         description: User not found
 *
 * 
*/