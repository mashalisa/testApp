const testController = require('../controllers/testController')

const express = require('express');
const router = express.Router()
const {authenticateToken, isAdminTeacher, isStudent} = require('../middleware/authMiddleware')
router.get('/', authenticateToken, isAdminTeacher,
    testController.getAllTest);
router.get('/:id', 
    authenticateToken, 
    isAdminTeacher,
    testController.getTestById);
router.get('/:id/studentTest', 
    authenticateToken, 
    isStudent,
    testController.getTestById);
router.put('/:id', authenticateToken, isAdminTeacher,
    testController.updateTest);
router.delete('/:id', authenticateToken, isAdminTeacher,
    testController.deleteTest);
router.post('/:teacherId', authenticateToken, isAdminTeacher,
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