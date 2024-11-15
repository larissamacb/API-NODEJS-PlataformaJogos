const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');
const Jogo = require('./jogo');
const Usuario = require('./usuario');

const JogoFavorito = jogosDB.define('JogoFavorito', {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
    primaryKey: true,
  },
  id_jogo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Jogo,
      key: 'id',
    },
    primaryKey: true,
  },
}, {
  tableName: 'jogo_favorito',
  timestamps: false,
});

JogoFavorito.belongsTo(Usuario, { foreignKey: 'id_usuario' });
JogoFavorito.belongsTo(Jogo, { foreignKey: 'id_jogo' });

module.exports = JogoFavorito;
