const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');
const Usuario = require('../models/usuario');
const Jogo = require('../models/jogo');

const Avaliacao = jogosDB.define('Avaliacao', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    id_jogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Jogo,
            key: 'id'
        }
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comentario: {
        type: DataTypes.TEXT,
    },
    data_avaliacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    hora_avaliacao: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'avaliacao',
    timestamps: false,
});

Avaliacao.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Avaliacao.belongsTo(Jogo, { foreignKey: 'id_jogo' });

module.exports = Avaliacao;
