const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');

const Plano = geralDB.define('Plano', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'plano',
  timestamps: false,
});


module.exports = Plano;
