const { DataTypes } = require('sequelize');
const sequelize = require('../config/geral_database');

const TipoPagamento = sequelize.define('TipoPagamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo: {
    type: DataTypes.STRING(30),
  },
}, {
  tableName: 'tipo_pagamento',
  timestamps: false,
});

module.exports = TipoPagamento;
