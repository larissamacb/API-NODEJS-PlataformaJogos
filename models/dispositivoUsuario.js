const { DataTypes } = require('sequelize');
const { geralDB } = require('../config/databases');
const Dispositivo = require('./dispositivo'); 
const Usuario = require('./usuario');  

const DispositivoUsuario = geralDB.define('DispositivoUsuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  id_tipo_dispositivo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Dispositivo, 
      key: 'id',
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
}, {
  tableName: 'dispositivo_usuario',
  timestamps: false,
});

DispositivoUsuario.belongsTo(Dispositivo, { foreignKey: 'id_tipo_dispositivo' });
DispositivoUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = DispositivoUsuario;
