
const User = require('../configDB/models/users')


const getAllUsers = (async() => {
    const users = await User.findAll({
        attributes: {exclude: ['password', 'createdAt', 'updatedAt'] }
    })
    return users
})

const getUserById = async(id) => {
    const user = await User.findByPk(id, {
        attributes: {exclude: ['password', 'createdAt', 'updatedAt'] }
    });
    if(!user)  {
        throw new Error ('User not found')
    }
    return user
}

const createUser = async(userData) => {
    const {name, username, role, email, password} = userData;

    const existUser = await User.findOne({where: {email}});
    if(existUser) {
        throw new Error('A user with this email already exists');
    }

    const newUser = await User.create({
        name, username, role, email, password
    })

    return newUser
}

const updateUser = async(id, userData) => {
    const user = await User.findByPk(id)
    if(!user) {
          throw new Error ('User not found')
    }
    if(userData.email && user.email !== userData.email) {
        const existingUser  = await User.findOne({where: {email: userData.email}});
        if(existingUser ) {
            throw new Error ('A user with this email already exists')
        }
    }
    let updateUserData = {
        name: userData.name ?? user.name,
        username: userData.username ?? user.username,
        email: userData.email ?? user.email,
        role: userData.role ?? user.role,
        password: userData.password ?? user.password,
    }

    const updatedUser = await user.update(updateUserData);
    return updatedUser
}

const deleteUser = async(id) => {
    const user = await User.findByPk(id)
     if(!user) {
          throw new Error ('User not found')
    }
    await user.destroy()
    return { message: 'User deleted successfully' };
}

module.exports = {
    deleteUser,
    updateUser,
    createUser,
    getUserById,
    getAllUsers
}