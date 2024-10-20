const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');
const Usuario = require('../models/usuario');

const SolicitacaoAmizade = geralDB.define('SolicitacaoAmizade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_usuario_solicitante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  id_usuario_destinatario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  data_solicitacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'aceito', 'rejeitado'),
    defaultValue: 'pendente',
  },
}, {
  tableName: 'solicitacao_amizade',
  timestamps: false,
});

SolicitacaoAmizade.belongsTo(Usuario, { as: 'solicitante', foreignKey: 'id_usuario_solicitante' });
SolicitacaoAmizade.belongsTo(Usuario, { as: 'destinatario', foreignKey: 'id_usuario_destinatario' });

module.exports = SolicitacaoAmizade;
