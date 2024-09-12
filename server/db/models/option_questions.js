const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const OptionQuestion = sequelize.define('OptionQuestion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  option_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  optioncatalog_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  optionquestion_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    foreignKey: true
  },
  subquestion_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  comment_optionres: {
    type: DataTypes.STRING,
    allowNull: true
  },
  numberoption: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'option_questions',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: false, 
  underscored: true,
});

OptionQuestion.associate = function(models) {
    OptionQuestion.belongsTo(models.Question, {
        foreignKey: 'optionquestion_id',
        as: 'question'
    });
 
};

module.exports = OptionQuestion;