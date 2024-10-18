const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');

const Genero = jogosDB.define('Genero', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  tableName: 'genero',
  timestamps: false,
});

module.exports = Genero;
