const express = require('express')
const router  = express.Router()
const authController = require('../controllers/authController')
const {isAdmin, authenticateToken} = require('../middleware/authMiddleware')
const {validate} = require('../middleware/validate');
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
const studentSignupSchema = baseUserSchema.append({
  role: Joi.string().valid('student').required(),
});

const teacherSignupSchema = baseUserSchema.append({
  role: Joi.string().valid('teacher', 'admin').required(),
});

const loginSchema = Joi.object({
  username: Joi.string().trim().min(1).lowercase().required(),
  password: Joi.string().trim().min(5).required(),
})

  router.post(
  '/teachers/signup',
  authenticateToken,
  isAdmin,
  validate(teacherSignupSchema),
  (req, res) => authController.registerUser(req, res, ['admin', 'teacher'])
)



router.post('/students/signup',  validate(studentSignupSchema),(req, res) => {
 authController.registerUser(req, res, ['student'])
});
router.post('/teachers/login', validate(loginSchema),(req, res) => {
    authController.login(req, res, ['admin', 'teacher'])
})
router.post('/login',  validate(loginSchema), (req, res) => {
    authController.login(req, res, ['student', 'admin', 'teacher'])
})

router.get('/user', authenticateToken, (req, res) => {
  res.json({ user: req.user }); 
});

module.exports = router

/**
 * @swagger
 * /autorization/teachers/signup:
 *   post:
 *     summary: Register a new teacher or admin user
 *     description: Creates a new user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - name
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing or invalid data
 */


/**
 * @swagger
 * /autorization/students/signup:
 *   post:
 *     summary: Register a new student user
 *     description: Creates a new user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - name
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing or invalid data
 */


/**
 * @swagger
 * /autorization/teachers/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Authenticates user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /autorization/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Authenticates user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /autorization/user:
 *   get:
 *     summary: Get current logged-in user
 *     description: Returns user info from the verified JWT token.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data returned
 *       401:
 *         description: Missing or invalid token
 */

module.exports = router;