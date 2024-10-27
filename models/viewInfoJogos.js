const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');

const InfoJogos = jogosDB.define('InfoJogos', {
    jogo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nome_jogo: {
        type: DataTypes.STRING,
    },
    data_lancamento: {
        type: DataTypes.DATE,
    },
    classificacao_etaria: {
        type: DataTypes.INTEGER,
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    avaliacao_media: {
        type: DataTypes.FLOAT,
    },
    foto_url: {
        type: DataTypes.STRING,
    },
    video_url: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'view_info_jogos',
    timestamps: false,
    freezeTableName: true
});

module.exports = InfoJogos;
