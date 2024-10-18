const { DataTypes } = require('sequelize');
const sequelize = require('../config/geral_database');

const Dispositivo = sequelize.define('Dispositivo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'dispositivo',
  timestamps: false,
});

module.exports = Dispositivo;
