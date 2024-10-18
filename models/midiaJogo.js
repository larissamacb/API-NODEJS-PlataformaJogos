const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');
const Jogo = require('./jogo');

const MidiaJogo = jogosDB.define('Midia_Jogo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_jogo: {
    type: DataTypes.INTEGER,
    references: {
      model: Jogo,
      key: 'id',
    },
  },
  tipo: {
    type: DataTypes.STRING(5),
    allowNull: false,
    validate: {
      isIn: [['foto', 'video']],
    },
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'midia_jogo',
  timestamps: false,
});

MidiaJogo.belongsTo(Jogo, { foreignKey: 'id_jogo' });

module.exports = MidiaJogo;
