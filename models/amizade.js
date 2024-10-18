const { DataTypes } = require('sequelize');
const sequelize = require('../config/geral_database');

const Amizade = sequelize.define('Amizade', {
  id_usuario1: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_usuario2: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  data_adicao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'amizade',
  timestamps: false,
});

module.exports = Amizade;
