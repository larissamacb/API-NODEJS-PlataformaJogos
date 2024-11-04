const { DataTypes } = require('sequelize');
const { loginDB } = require('../config/databases');

const FotoPerfil = loginDB.define('Foto_Perfil', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filedata: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['original', 'adicionada']],
    },
  },
}, {
  tableName: 'foto_perfil',
  timestamps: false,
});

module.exports = FotoPerfil;
