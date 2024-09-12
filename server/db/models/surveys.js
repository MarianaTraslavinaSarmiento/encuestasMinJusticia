const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Survey = sequelize.define('Survey', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at'
  },
  componentHtml: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'componenthtml'
  },
  componentReact: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'componentreact'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  instruction: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'surveys', 
  timestamps: true,
  underscored: true,
});

Survey.associate = function(models) {
    Survey.hasMany(models.Chapter, { 
      foreignKey: 'survey_id',
      as: 'chapters'
    });
};

module.exports = Survey;