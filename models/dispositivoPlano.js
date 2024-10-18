const { DataTypes } = require('sequelize');
const sequelize = require('../config/geral_database');
const Dispositivo = require('./dispositivo');
const Plano = require('./plano');

const DispositivoPlano = sequelize.define('DispositivoPlano', {
  id_dispositivo: {
    type: DataTypes.INTEGER,
    references: {
      model: Dispositivo,
      key: 'id',
    },
    primaryKey: true,
  },
  id_plano: {
    type: DataTypes.INTEGER,
    references: {
      model: Plano,
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  tableName: 'dispositivo_plano',
  timestamps: false,
});

module.exports = DispositivoPlano;
