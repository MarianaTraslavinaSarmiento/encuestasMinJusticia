const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Chapter = sequelize.define('Chapter', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    survey_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    componenthtml: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    componentreact: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    chapter_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chapter_title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'chapters',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true,
});

Chapter.associate = function (models) {
    Chapter.belongsTo(models.Survey, {
        foreignKey: 'survey_id',
        as: 'survey'
    });
    
    Chapter.hasMany(models.Question, {
        foreignKey: 'chapter_id',
        as: 'questions'
    });
};



module.exports = Chapter;