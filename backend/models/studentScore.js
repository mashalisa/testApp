const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize')

const StudentScore = sequelize.define('StudentScore', {
    id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    student_id: {
         type: DataTypes.UUID,
         allowNull:false
    },
    test_id: {
         type: DataTypes.UUID,
         allowNull:false
    },
    total_questions: {
         type: DataTypes.INTEGER,
         allowNull:false,
         defaultValue: 0
    },
    correct_answers: {
         type: DataTypes.INTEGER,
         allowNull:false,
         defaultValue: 0
    },
     score: {
         type: DataTypes.FLOAT,
         allowNull:false,
         defaultValue: 0
    }

}, {
    tableName:"student_score",
    timestamps:true
})

module.exports = StudentScore