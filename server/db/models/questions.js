const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  question_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  response_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comment_question: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'questions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
});

Question.associate = (models) => {
  Question.belongsTo(models.Chapter, {
    foreignKey: 'chapter_id',
    as: 'chapter'
  });

  Question.hasMany(models.OptionQuestion, {
    foreignKey: 'optionquestion_id',
    as: 'options'
  });
};

module.exports = Question;