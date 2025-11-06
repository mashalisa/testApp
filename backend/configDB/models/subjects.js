const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Subjects = sequelize.define('Subjects', {
    id: {
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName: 'subjects',
    timestamps:true
})

module.exports = Subjects