const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');

const TipoPagamento = geralDB.define('TipoPagamento', {
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
