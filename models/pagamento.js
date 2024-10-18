const { DataTypes } = require('sequelize');
const sequelize = require('../config/geral_database');
const FormaPagamento = require('./formaPagamento');
const TipoPagamento = require('./tipoPagamento');

const Pagamento = sequelize.define('Pagamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_forma_pagamento: {
    type: DataTypes.INTEGER,
    references: {
      model: FormaPagamento,
      key: 'id',
    },
  },
  id_tipo_pagamento: {
    type: DataTypes.INTEGER,
    references: {
      model: TipoPagamento,
      key: 'id',
    },
  },
  data_pagamento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pagamento',
  timestamps: false,
});

module.exports = Pagamento;
