const Plano = require('../models/plano');
const JogoPlano = require('../models/jogoPlano');
const InfoJogos = require('../models/viewInfoJogos');

const { Op } = require('sequelize');
const { jogosDB } = require('../config/databases');

exports.getAllJogos = async (req, res) => {
    try {
        const jogos = await InfoJogos.findAll();
        res.status(200).json(jogos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar jogos', error });
    }
};

exports.getJogoById = async (req, res) => {
  try {
    const jogo = await InfoJogos.findOne({ where: { jogo_id: req.params.id } });
    if (!jogo) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }
    res.status(200).json(jogo);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o jogo', error });
  }
};

exports.getJogosByGenero = async (req, res) => {
  try {
    const { nome } = req.params;

    const jogos = await jogosDB.query(
      `SELECT * FROM view_info_jogos WHERE lower(generos::text) LIKE lower('%${nome}%')`,
      { type: jogosDB.QueryTypes.SELECT }
    );

    if (jogos.length === 0) {
      return res.status(404).json({ message: 'Nenhum jogo encontrado para este gênero' });
    }

    res.status(200).json(jogos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar jogos por gênero', error });
  }
};

exports.getJogosByAvaliacao = async (req, res) => {
  try {
    const avaliacao = parseFloat(req.params.avaliacao);

    if (isNaN(avaliacao)) {
      return res.status(400).json({ message: 'Avaliação média deve ser um número válido.' });
    }

    const jogos = await jogosDB.query(
      `SELECT * FROM view_info_jogos WHERE avaliacao_media >= :avaliacao`,
      {
        replacements: { avaliacao },
        type: jogosDB.QueryTypes.SELECT,
      }
    );

    res.status(200).json(jogos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar jogos por avaliação', error });
  }
};

exports.getJogosByOrdem = async (req, res) => {
  try {
    const jogos = await jogosDB.query(
      `SELECT * FROM view_info_jogos ORDER BY nome_jogo ASC`,
      {
        type: jogosDB.QueryTypes.SELECT,
      }
    );

    res.status(200).json(jogos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar jogos em ordem alfabética', error });
  }
};

exports.getJogosByPlano = async (req, res) => {
  try {
    const { nome } = req.params;

    if (!nome) {
      return res.status(400).json({ message: 'Nome do plano não fornecido' });
    }

    const plano = await Plano.findOne({
      where: {
        nome: {
          [Op.iLike]: nome
        }
      }
    });

    if (!plano) {
      return res.status(404).json({ message: 'Nenhum plano encontrado com esse nome' });
    }

    const jogoPlanos = await JogoPlano.findAll({
      where: {
        id_plano: plano.id
      },
      attributes: ['id_jogo'] 
    });

    if (!jogoPlanos.length) {
      return res.status(404).json({ message: 'Nenhum jogo encontrado para este plano' });
    }

    const idJogos = jogoPlanos.map(jp => jp.id_jogo);

    const jogos = await jogosDB.query(
      `SELECT * FROM view_info_jogos 
       WHERE jogo_id IN (:idJogos)`,
      {
        replacements: { idJogos: idJogos },
        type: jogosDB.QueryTypes.SELECT
      }
    );

    res.status(200).json(jogos);
  } catch (error) {
    console.error('Erro ao buscar jogos por plano:', error);
    res.status(500).json({ message: 'Erro ao buscar jogos por plano', error: error.message });
  }
};
