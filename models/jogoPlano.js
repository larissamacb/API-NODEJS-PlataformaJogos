const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');
const Plano = require('../models/plano');
const Jogo = require('../models/jogo'); 

const JogoPlano = geralDB.define('Jogo_Plano', {
  id_plano: {
    type: DataTypes.INTEGER,
    references: {
      model: Plano,
      key: 'id',
    },
    allowNull: false,
  },
  id_jogo: {
    type: DataTypes.INTEGER,
    references: {
      model: Jogo, 
      key: 'id',
    },
    allowNull: false,
  },
  data_adicao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'jogo_plano',
  timestamps: false,
});

JogoPlano.associate = function(models) {
  JogoPlano.belongsTo(Plano, { foreignKey: 'id_plano' });
  JogoPlano.belongsTo(Jogo, { foreignKey: 'id_jogo' });
};

module.exports = JogoPlano;
