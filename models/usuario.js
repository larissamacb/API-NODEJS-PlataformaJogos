const { DataTypes } = require('sequelize');
const { loginDB } = require('../config/databases');
const FotoPerfil = require('./fotoPerfil');
const Plano = require('./plano')

const Usuario = loginDB.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  identificador: {
    type: DataTypes.STRING(16),
    unique: true,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(70),
    unique: true,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_plano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_foto_perfil: {
    type: DataTypes.INTEGER,
    references: {
      model: FotoPerfil,
      key: 'id',
    },
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

Usuario.belongsTo(FotoPerfil, { foreignKey: 'id_foto_perfil' });
Usuario.belongsTo(Plano, { foreignKey: 'id_plano' });

module.exports = Usuario;
