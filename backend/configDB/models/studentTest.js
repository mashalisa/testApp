const { sequelize } = require('../sequelize')

const { DataTypes } = require('sequelize');

const StudentTest = sequelize.define('StudentTest', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    test_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('in_progress', 'completed', 'submitted'),
        allowNull: false,
        defaultValue: 'in_progress'
    }
}, {
    tableName: 'student_tests',
    timestamps: true
})

module.exports = StudentTest