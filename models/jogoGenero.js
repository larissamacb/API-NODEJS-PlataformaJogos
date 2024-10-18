const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');
const Jogo = require('./jogo');
const Genero = require('./genero');

const JogoGenero = jogosDB.define('Jogo_Genero', {
  id_jogo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Jogo,
      key: 'id',
    },
  },
  id_genero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Genero,
      key: 'id',
    },
  },
}, {
  tableName: 'jogo_genero',
  timestamps: false,
});

Jogo.belongsToMany(Genero, { through: JogoGenero, foreignKey: 'id_jogo' });
Genero.belongsToMany(Jogo, { through: JogoGenero, foreignKey: 'id_genero' });

module.exports = JogoGenero;
