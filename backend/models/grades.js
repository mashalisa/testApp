const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/sequelize');

const Grades = sequelize.define('grades', {
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    }
}, {
    tableName: 'grades',
    timestamps:true
})

module.exports = Grades