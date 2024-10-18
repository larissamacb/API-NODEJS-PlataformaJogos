const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');

const Jogo = jogosDB.define('Jogo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  data_lancamento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  classificacao_etaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  avaliacao_media: {
    type: DataTypes.DECIMAL(2, 1),
  },
}, {
  tableName: 'jogo',
  timestamps: false,
});

module.exports = Jogo;
