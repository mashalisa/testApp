// npm install swagger-ui-express swagger-jsdoc

const userController = require('../controllers/userController')

const express = require('express')


const {validate, validateParams} = require('../middleware/validate');
const Joi = require('joi')


const baseUserSchema = Joi.object({
  name: Joi.string().trim().min(1).lowercase().required(),
  username: Joi.string().trim().min(1).lowercase().required(),
  email: Joi.string().trim().email().lowercase().required(),
  password: Joi.string().trim().min(5).required(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().trim().min(1).lowercase().optional(),
  birthDate: Joi.date().optional(),
});

const userUpdateSchema = Joi.object({
  name: Joi.string().trim().min(1).lowercase().optional(),
  username: Joi.string().trim().min(1).lowercase().optional(),
  email: Joi.string().trim().email().lowercase().optional(),
  password: Joi.string().trim().min(5).optional(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().trim().min(1).lowercase().optional(),
  birthDate: Joi.date().optional(),
});

const studentSignupSchema = baseUserSchema.append({
  role: Joi.string().valid('student').required(),
});

const userCreateSchema = baseUserSchema.append({
  role: Joi.string().valid('teacher', 'admin').required(),
});

const paramIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
})


const router = express.Router();
const {authenticateToken, isAdmin, isTeacher} = require('../middleware/authMiddleware')
router.get('/', authenticateToken, isAdmin,
    userController.getAllUsers)

    router.get('/students', authenticateToken, isTeacher,
    userController.getAllStudnets)

router.get('/:id', 
    authenticateToken,
     isAdmin,
     validateParams(paramIdSchema),
    userController.getUserById)
    
router.post('/', 
    authenticateToken, 
    isAdmin,
    validate(userCreateSchema),
    userController.createUser)
router.put('/:id', 
    authenticateToken, 
    isAdmin,
    validateParams(paramIdSchema),
    validate(userUpdateSchema),
    userController.updateUser)
router.delete('/:id', 
    authenticateToken,
     isAdmin,
     validateParams(paramIdSchema),
    userController.deleteUser)

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the user
 *         name:
 *           type: string
 *           description: Full name of the user
 *         username:
 *           type: string
 *           description: Unique username for login
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         password:
 *           type: string
 *           description: The user's password (hashed)
 *         role:
 *           type: string
 *           enum: [admin, teacher, student]
 *           description: Role of the user
 *         phoneNumber:
 *           type: string
 *           description: Contact phone number
 *         address:
 *           type: string
 *           description: Address of the user
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Date of birth
 *         profilePicture:
 *           type: string
 *           description: URL or file path of profile picture
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
 * /api/users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/students:
 *   get:
 *     summary: Returns all students
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * */