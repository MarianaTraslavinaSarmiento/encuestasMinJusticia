const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js'); // Adjust the path as needed

const SubQuestion = sequelize.define('SubQuestion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  subquestion_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  subquestion_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  comment_subquestion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  subquestiontext: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'sub_questions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true
});


SubQuestion.associate = function(models) {
  SubQuestion.belongsTo(models.OptionQuestion, {
    foreignKey: 'subquestion_id',
    as: 'optionQuestion'
  });
};

module.exports = SubQuestion;