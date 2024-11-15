const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');

const Dispositivo = geralDB.define('Dispositivo', {
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
