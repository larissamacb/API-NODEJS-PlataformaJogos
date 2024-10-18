const { DataTypes } = require('sequelize');
const sequelize = require('../config/geral_database');
const TipoPagamento = require('./tipoPagamento');

const FormaPagamento = sequelize.define('FormaPagamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_tipo_pagamento: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoPagamento,
      key: 'id',
    },
  },
  numero_cartao: {
    type: DataTypes.STRING(16),
  },
  nome_no_cartao: {
    type: DataTypes.STRING(50),
  },
  cvv: {
    type: DataTypes.STRING(3),
  },
}, {
  tableName: 'forma_pagamento',
  timestamps: false,
});

module.exports = FormaPagamento;
