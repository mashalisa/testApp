//  npm i jsonwebtoken 
// npm i dotenv

const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token required' });

        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' })
        }
        res.status(403).json({ message: 'Invalid token' });
    }

}


const isAdmin = (req, res, next) => {
    console.log(req, 'req')
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
    
}
const isTeacher = (req, res, next) => {
    console.log(req, 'req')
     if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Teacher access required' });
  }
    next()
    
}
const isAdminTeacher = (req, res, next) => {
    console.log('checking ')
    console.log(req, "req.body")
     if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Teacher or admin access required' });
  }
    next()
    
}
const isStudent = (req, res, next) => {
    if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Student access required' });
  }
    next()
    
}
module.exports = {authenticateToken, isAdmin, isTeacher, isStudent, isAdminTeacher}

