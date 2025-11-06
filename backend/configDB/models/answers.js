const {sequelize} = require('../sequelize')
const {DataTypes} = require('sequelize')

const Answer = sequelize.define('Answers', {
    id: {
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    correctAnswer: {
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    question_id: {
         type: DataTypes.UUID,
    }
}, {
    tableName:'answers',
    timestamps:true
})

module.exports = Answer