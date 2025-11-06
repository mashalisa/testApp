const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const CoreSubjects  = sequelize.define('CoreSubjects', {
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
    tableName: 'core_subjects',
    timestamps:true
})

module.exports = CoreSubjects 