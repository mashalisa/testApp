
const { Op } = require('sequelize');
const {User} = require('../configDB/models')
const jwt = require('jsonwebtoken')

const resiveUser = (user) => ({
  id: user.id,
  email: user.email,
  username: user.username,
  role: user.role
});
const registerUser = async (userData, allowedRole) => {
    const { username, email, password, role, name, phoneNumber, address, birthDate, profilePicture} = userData;
    console.log(userData, 'userData')
    if (!name || !username || !password || !role || !email) {
        throw new Error('missing data')
    }
    const existingUser = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } })
    if (existingUser) {
        throw new Error('the user  already exists')
    }
    if(!allowedRole.includes(role)) {
         const error = new Error('Access denied for this role');
        error.status = 403;
        throw error;
    }
    

    const user = await User.create({
        username, email, password, role, name, phoneNumber, address, birthDate, profilePicture
    })

    return {
        message: "User registered successfully",
        user: resiveUser(user)

    }
}
const loginUser = async (userData, allowedRoles) => {
    console.log(userData, 'user login')
    console.log(allowedRoles, 'user login')
    const { username, password } = userData;
    if (!username || !password) {
        throw new Error('missing data')
    }

    const user = await User.findOne({ where: { username } })
    if (!user) {
        throw new Error('this user is not exists')
    }

    const isMatch = await user.validatePassword(password)
    if (!isMatch) {
        const error = new Error('wrong password');
        error.status = 401;
        throw error;
    }
    if(!allowedRoles.includes(user.role)) {
        const error = new Error('Access denied for this role');
        error.status = 403;
        throw error;
    }
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
        role:user.role
    },
        process.env.JWT_SECRET,  { expiresIn: '1h' })
    return ({
        message: 'Login successful',
        token,
        user:  resiveUser(user)
    })

}
module.exports = {
    registerUser, loginUser
}