const {sequelize} = require('../sequelize')
const {DataTypes} = require('sequelize')


const Question  = sequelize.define('Question', {
    id: {
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    test_id: {
        type: DataTypes.UUID
    }
},
{
    tableName: 'questions',
    timestamps:true
})

module.exports = Question