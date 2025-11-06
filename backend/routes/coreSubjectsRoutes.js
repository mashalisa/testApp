// npm install swagger-ui-express swagger-jsdoc

const coreSubjectController = require('../controllers/coreSubjectController')
const {authenticateToken, isAdminTeacher} = require('../middleware/authMiddleware')
const express = require('express')

const router = express.Router();

router.get('/by-name', authenticateToken, isAdminTeacher,
    coreSubjectController.getCoreSubjectByName)
router.get('/', authenticateToken, isAdminTeacher,
    coreSubjectController.getAllCoreSubject)
router.get('/:id', authenticateToken, isAdminTeacher,
    coreSubjectController.getCoreSubjectByID)
router.post('/', authenticateToken, isAdminTeacher,
    coreSubjectController.createCoreSubject)
router.put('/:id', authenticateToken, isAdminTeacher,
    coreSubjectController.updateCoreSubject)
router.delete('/:id', authenticateToken, isAdminTeacher,
    coreSubjectController.deleteCoreSubject)

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
 *             $ref: '#/components/schemas/CoreSubject'
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
 *             $ref: '#/components/schemas/CoreSubject'
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