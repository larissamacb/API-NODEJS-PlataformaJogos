const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases'); 
const Usuario = require('../models/usuario');

const Amizade = geralDB.define('Amizade', {
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

Amizade.belongsTo(Usuario, { foreignKey: 'id_usuario1' });
Amizade.belongsTo(Usuario, { foreignKey: 'id_usuario2' });

module.exports = Amizade;
