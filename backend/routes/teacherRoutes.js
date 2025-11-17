const teacherController = require('../controllers/teacherController')
const express = require('express');
const router = express.Router()
const {authenticateToken, isAdminTeacher} = require('../middleware/authMiddleware')


const Joi = require('joi')
const { validate, validateParams } = require('../middleware/validate')

const assignGragesSchema = Joi.object({
    grade_id: Joi.string().uuid().required(),
    coreSubject_id: Joi.string().uuid().required(),
    subject_id: Joi.string().uuid().required(),
});
const studentSchema = Joi.object({
    id: Joi.string().uuid().required(),
})
const assignStudentsSchema = Joi.object({
  students: Joi.array().items(Joi.string().uuid()).min(1).required()
});
const teacherParamsIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
});


router.get('/', authenticateToken, isAdminTeacher,
    teacherController.getAllTeachers)
router.get('/:id', 
    authenticateToken, 
    isAdminTeacher,
    validateParams(teacherParamsIdSchema),
    teacherController.getTeacherById)
router.put('/:id', 
    authenticateToken, 
    isAdminTeacher,
    validateParams(teacherParamsIdSchema),
    teacherController.updateTeacherById)
router.post('/:id', 
    authenticateToken, 
    isAdminTeacher,
    validate(assignGragesSchema),
    validateParams(teacherParamsIdSchema),
    teacherController.assignGradesToTeacher)
router.post('/:id/students', 
    authenticateToken, 
    isAdminTeacher,
    validateParams(teacherParamsIdSchema),
    validate(assignStudentsSchema),
    teacherController.assignStudentsToTeacher)
router.delete('/:id/students', 
    authenticateToken, 
    isAdminTeacher,
     validateParams(teacherParamsIdSchema),
       validate(assignStudentsSchema),
    teacherController.reassignStudentsToTeacher)



module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     UserTeacherView:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "42a5f742-1058-4633-a58d-84bde0730987"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         role:
 *           type: string
 *           example: "teacher"
 *         grades:
 *           type: array
 *           items:
 *             type: string
 *           example: ["1th", "2th"]
 *         coreSubjects:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Math"]
 *         subjects:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Algebra", "Geometry"]
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
 * /api/teachers:
 *   get:
 *     summary:  Get all teachers (users with role = 'teacher')
 *     tags: [Teachers]
 *     operationId: getAllTeachers
 *     responses:
 *       200:
 *         description: The list of Teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserTeacherView'
 *




 * /api/teachers/{id}:
 *   get:
 *     summary: Get a Teacher by ID
 *     tags: [Teachers]
 *     operationId: getTeacherById
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Teacher ID
 *     responses:
 *       200:
 *         description: The Teacher data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserTeacherView'
 *       404:
 *         description: Teacher not found
 *
 *   put:
 *     summary: Update a Teacher by ID
 *     tags: [Teachers]
 *     operationId: updateTeacherById
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grades:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1th", "2th"]
 *               coreSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["math"]
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["algebra", "geometry"]
 *     responses:
 *       200:
 *         description: Teacher updated
 *       404:
 *         description: Teacher not found
 *
 *   post:
 *     summary: assign grades to Teacher by ID
 *     tags: [Teachers]
 *     operationId: assign Grates
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The Teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grades:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["1th", "2th"]
 *               coreSubjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Math", "Science"]
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["algebra", "geometry"]
 *     responses:
 *       200:
 *         description: Teacher updated
 *       404:
 *         description: Teacher not found
 */

/**
 * @swagger
 * /api/teachers/{id}/students:
 *   post:
 *     summary: Assign students to a teacher
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [3, 4, 5]
 *     responses:
 *       200:
 *         description: Students assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Students assigned successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *
 *   delete:
 *     summary: Remove assigned students from a teacher
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               students:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [3, 4]
 *     responses:
 *       200:
 *         description: Students unassigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Students unassigned successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */