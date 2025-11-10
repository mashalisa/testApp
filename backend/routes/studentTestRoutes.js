const studentTestController = require('../controllers/studentTestController')

const express = require('express')

const {authenticateToken, isAdminTeacher, isStudent} = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/test/:testId/students', 
    authenticateToken, 
    isAdminTeacher,
    studentTestController.getAllStudentsByTestId)

router.get('/students/:studentId/tests', 
    authenticateToken, 
    isAdminTeacher,
    studentTestController.getAllTestsByStudentId)

router.get('/students/:studentId/my-test', 
    authenticateToken, 
    isStudent,
    studentTestController.getAllTestsByCurrentStudentId)

router.post('/test/:testId/students/:studentId', 
    authenticateToken, 
    isAdminTeacher,
    studentTestController.createNewTestStudent)

router.post('/test/:testId/students/:studentId/inProgress', 
    authenticateToken, 
    isStudent,
    studentTestController.createNewTestCurrentStudent)

router.put('/test/:testId/students/:studentId', 
    authenticateToken, 
    isAdminTeacher,
    studentTestController.updateTestStudent)

router.put('/test/:testId/students/:studentId/end', 
    authenticateToken, 
    isStudent,
    studentTestController.updateTestCurrentStudent)
    
router.delete('/:id', 
    authenticateToken, 
    isAdminTeacher,
    studentTestController.deleteStudentTest)

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
 *         - start_time: {
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




