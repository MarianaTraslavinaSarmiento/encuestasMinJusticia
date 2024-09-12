const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js'); 

const OptionResponse = sequelize.define('OptionResponse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  optiontext: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'options_response',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true
});

OptionResponse.associate = function(models) {
  OptionResponse.hasOne(models.OptionQuestion, {
    foreignKey: 'option_id',
    as: 'optionQuestion'
  });
};

module.exports = OptionResponse;