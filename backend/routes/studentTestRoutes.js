const studentTestController = require('../controllers/studentTestController')

const express = require('express')

const { authenticateToken, isAdminTeacher, isStudent } = require('../middleware/authMiddleware')
const router = express.Router()
const Joi = require('joi')
const { validate, validateParams } = require('../middleware/validate')

const testStudentSchema = Joi.object({
    status: Joi.string().valid('in_progress', 'completed', 'submitted').required(),
    start_time: Joi.date().optional(),
    end_time: Joi.date().optional(),
});

const testStudentsIdSchema = Joi.object({
     studentIds: Joi.array().items(Joi.string().uuid()).min(1).required()

});
const testStudentUpdateSchema = Joi.object({
    status: Joi.string().valid('in_progress', 'completed', 'submitted').optional(),
    start_time: Joi.date().optional(),
    end_time: Joi.date().when('status', {
    is: 'submitted',
    then: Joi.date().required(),
    otherwise: Joi.date().optional(),
  }),
});
   const testAndStudentParamSchema = Joi.object({
       testId: Joi.string().uuid().required(),
       studentId: Joi.string().uuid().required(),
   });
   
const studetnIdParamsSchema = Joi.object({
    studentId: Joi.string().uuid().required(),
});
const testIdParamsIdSchema = Joi.object({
    testId: Joi.string().uuid().required(),
});
const paramsIdSchema = Joi.object({
    testId: Joi.string().uuid().required(),
});




router.get('/test/:testId/students',
    authenticateToken,
    isAdminTeacher,
    validateParams(testIdParamsIdSchema),
    studentTestController.getAllStudentsByTestId)

router.get('/students/:studentId/tests',
    authenticateToken,
    isAdminTeacher,
    validateParams(studetnIdParamsSchema),
    studentTestController.getAllTestsByStudentId)

router.get('/students/:studentId/my-tests',
    authenticateToken,
    isStudent,
       validateParams(studetnIdParamsSchema),
    studentTestController.getAllTestsByCurrentStudentId)

router.post('/test/:testId/students/:studentId',
    authenticateToken,
    isAdminTeacher,
       validateParams(testAndStudentParamSchema),
          validate(testStudentSchema),
    studentTestController.createNewTestStudent)

router.post('/test/:testId/students/:studentId/inProgress',
    authenticateToken,
    isStudent,
      validateParams(testAndStudentParamSchema),
          validate(testStudentSchema),
    studentTestController.createNewTestCurrentStudent)

router.put('/test/:testId/students/:studentId',
    authenticateToken,
    isAdminTeacher,
      validateParams(testAndStudentParamSchema),
          validate(testStudentUpdateSchema),
    studentTestController.updateTestStudent)

router.put('/test/:testId/students/:studentId/end',
    authenticateToken,
    isStudent,
      validateParams(testAndStudentParamSchema),
          validate(testStudentUpdateSchema),
    studentTestController.updateTestCurrentStudent)

router.delete('/:id',
    authenticateToken,
    isAdminTeacher,
     validateParams(paramsIdSchema),
    studentTestController.deleteStudentTest)

router.post('/test/:testId/',
    authenticateToken,
    isAdminTeacher,
       validateParams(testIdParamsIdSchema),
          validate(testStudentsIdSchema),
    studentTestController.assignTestToStudnets)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     StudentTest:
 *       type: object
 *       required:
 *         - user_id
 *         - test_id
 *         - start_time: 
 *         - end_time
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Auto-generated ID
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: ID of the student
 *         test_id:
 *           type: string
 *           format: uuid
 *           description: ID of the test
 *         status:
 *           type: string
 *           description: status of test
 *         start_time:
 *           type: string
 *           format: date-time
 *         end_time:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/student-tests/students/{studentId}/tests:
 *   get:
 *     summary: Get all tests by a student ID
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentTest'
 *       404:
 *         description: No tests found
 */

/**
 * @swagger
 * /api/student-tests/students/{studentId}/my-tests:
 *   get:
 *     summary: Get all tests by a student ID 
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentTest'
 *       404:
 *         description: No tests found
 */


/**
 * @swagger
 * /api/student-tests/test/{testId}/students:
 *   get:
 *     summary: Get all students by a test ID
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Test ID
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StudentTest'
 *       404:
 *         description: No students found
 */

/**
 * @swagger
 * /api/student-tests/test/{testId}/students/{studentId}:
 *   post:
 *     summary: Create a new student test entry
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Test ID
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - start_time
 *             properties:
 *               status:
 *                 type: string
 *                 example: "in_progress"
 *               start_time:
 *                 type: string       
 *                 format: date-time  
 *                 example: "2025-11-05T14:30:00.000Z"
 *     responses:
 *       201:
 *         description: Entry created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentTest'
 *       400:
 *         description: Missing data
 */


/**
 * @swagger
 * /api/student-tests/test/{testId}/students/{studentId}/inProgress:
 *   post:
 *     summary: Create a new student test entry
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Test ID
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - start_time
 *             properties:
 *               status:
 *                 type: string
 *                 example: "in_progress"
 *               start_time:
 *                 type: string       
 *                 format: date-time  
 *                 example: "2025-11-05T14:30:00.000Z"
 *     responses:
 *       201:
 *         description: Entry created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentTest'
 *       400:
 *         description: Missing data
 */

/**
 * @swagger
 * /api/student-tests/test/{testId}/students/{studentId}:
 *   put:
 *     summary: Update a student test entry
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Test ID
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - end_time
 *             properties:
 *               status:
 *                 type: string
 *                 example: "completed"
 *               end_time:
 *                 type: string       
 *                 format: date-time   
 *                 example: "2025-11-05T14:30:00.000Z"
 *     responses:
 *       200:
 *         description: Entry updated
 *       404:
 *         description: Entry not found
 *
 */

/**
 * @swagger
 * /api/student-tests/test/{testId}/students/{studentId}/end:
 *   put:
 *     summary: Update a student test entry
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Test ID
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *               - end_time
 *             properties:
 *               status:
 *                 type: string
 *                 example: "completed"
 *               end_time:
 *                 type: string       
 *                 format: date-time   
 *                 example: "2025-11-05T14:30:00.000Z"
 *     responses:
 *       200:
 *         description: Entry updated
 *       404:
 *         description: Entry not found
 *
 */

/**
 * @swagger
 * /api/student-tests/{id}:
 *   delete:
 *     summary: Delete a student test entry
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Entry ID
 *     responses:
 *       200:
 *         description: Entry deleted successfully
 *       404:
 *         description: Entry not found
 */

/**
 * @swagger
 * /api/student-tests/test/{testId}:
 *   post:
 *     summary: Assign test to students
 *     tags: [StudentTests]
 *     parameters:
 *       - in: path
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentIds
 *             properties:
 *               studentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *     responses:
 *       201:
 *         description: Tests assigned successfully
 */
