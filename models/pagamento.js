const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');
const FormaPagamento = require('./formaPagamento');
const TipoPagamento = require('./tipoPagamento');
const Usuario = require('./usuario');
const Plano = require('./plano');

const Pagamento = geralDB.define('Pagamento', {
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
  id_plano: {
    type: DataTypes.INTEGER,
    references: {
      model: Plano,
      key: 'id',
    },
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  data_pagamento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'pagamento',
  timestamps: false,
});

Pagamento.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Pagamento.belongsTo(FormaPagamento, { foreignKey: 'id_forma_pagamento' });
Pagamento.belongsTo(TipoPagamento, { foreignKey: 'id_tipo_pagamento' });
Pagamento.belongsTo(Plano, { foreignKey: 'id_plano' });

module.exports = Pagamento;
