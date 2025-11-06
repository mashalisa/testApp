const {sequelize} = require('../sequelize')
const {DataTypes} = require('sequelize')


const StudentAnswer = sequelize.define('StudentAnswer', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    studentTest_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    question_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    chosenAnswer_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
     tableName: 'student_answers',
  timestamps: true
})

module.exports = StudentAnswer