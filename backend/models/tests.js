const { sequelize } = require('../config/sequelize');

const { DataTypes } = require('sequelize')


const Test = sequelize.define('Test', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type:DataTypes.STRING,
        allowNull: false
    },
    teacher_id: {
      type: DataTypes.UUID,   
    },
    grade_id: {
      type: DataTypes.UUID,   
    },
     coreSubject_id: {
      type: DataTypes.UUID,   
    },
     subject_id: {
      type: DataTypes.UUID,   
    },
    test_URL: {
      type: DataTypes.STRING,   
    }

},
{
    tableName: 'tests',
    timestamps: true
})

module.exports = Test