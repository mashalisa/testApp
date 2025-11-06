const { DataTypes } = require('sequelize')

const { sequelize } = require('../sequelize');

const bcrypt = require('bcrypt')


const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'teacher', 'student'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    profilePicture: {
        type: DataTypes.STRING, 
        allowNull: true
    }

}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt)
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt)
            }
        }
    }

})
Users.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}
module.exports = Users