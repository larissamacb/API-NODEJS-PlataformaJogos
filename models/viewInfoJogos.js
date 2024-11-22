const { DataTypes } = require('sequelize');
const { jogosDB } = require('../config/databases');

const InfoJogos = jogosDB.define('InfoJogos', {
    jogo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'jogo_id',
    },
    nome_jogo: {
        type: DataTypes.STRING,
        field: 'nome_jogo',
    },
    data_lancamento: {
        type: DataTypes.DATE,
        field: 'data_lancamento',
    },
    classificacao_etaria: {
        type: DataTypes.INTEGER,
        field: 'classificacao_etaria',
    },
    descricao: {
        type: DataTypes.TEXT,
        field: 'descricao',
    },
    avaliacao_media: {
        type: DataTypes.FLOAT,
        field: 'avaliacao_media',
    },
    foto_id: {
        type: DataTypes.INTEGER,
        field: 'foto_id',
    },
    video_id: {
        type: DataTypes.INTEGER,
        field: 'video_id',
    },
    generos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        field: 'generos',
    },
}, {
    tableName: 'view_info_jogos',
    timestamps: false,
    freezeTableName: true,
});

module.exports = InfoJogos;
