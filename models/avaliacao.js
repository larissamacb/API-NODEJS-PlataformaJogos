const { DataTypes } = require('sequelize');
const sequelize = require('../config/geral_database');

const Avaliacao = sequelize.define('Avaliacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_jogo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5,
    },
  },
  comentario: {
    type: DataTypes.TEXT,
  },
  data_avaliacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'avaliacao',
  timestamps: false,
});

module.exports = Avaliacao;
