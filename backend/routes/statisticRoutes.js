const {testStatisticController} = require('../controllers/statisticController')

const express = require('express');
const router = express.Router()
const { authenticateToken, isAdminTeacher } = require('../middleware/authMiddleware')

const Joi = require('joi')
const {  validateParams } = require('../middleware/validate')


const teacherIdParamSchema = Joi.object({
    teacherId: Joi.string().uuid().required(),
});

router.get('/:teacherId', authenticateToken, isAdminTeacher,
    validateParams(teacherIdParamSchema),
     testStatisticController);

module.exports = router;



/**
 * @swagger
 * /api/statistic/{id}:
 *   get:
 *     summary: Get a Tests by teacher ID
 *     tags: [StudentTest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The teacher ID
 *     responses:
 *       200:
 *         description: The Tests data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentTest'
 *       404:
 *         description: User not found
 *
*/