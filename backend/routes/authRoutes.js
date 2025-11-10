const express = require('express')
const router  = express.Router()
const authController = require('../controllers/authController')
const {isAdmin, authenticateToken} = require('../middleware/authMiddleware')


  router.post(
  '/teachers/signup',
  authenticateToken,
  isAdmin,
  (req, res) => authController.registerUser(req, res, ['admin', 'teacher'])
)



router.post('/students/signup', (req, res) => {
 authController.registerUser(req, res, ['student'])
});
router.post('/teachers/login', (req, res) => {
    authController.login(req, res, ['admin', 'teacher'])
})
router.post('/students/login', (req, res) => {
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
 * /autorization/students/login:
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