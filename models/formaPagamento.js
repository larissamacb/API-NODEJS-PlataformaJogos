const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');
const TipoPagamento = require('./tipoPagamento');

const FormaPagamento = geralDB.define('FormaPagamento', {
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
  validade: {
    type: DataTypes.STRING(5),
  },
}, {
  tableName: 'forma_pagamento',
  timestamps: false,
});

FormaPagamento.belongsTo(TipoPagamento, { foreignKey: 'id_tipo_pagamento' });

module.exports = FormaPagamento;
