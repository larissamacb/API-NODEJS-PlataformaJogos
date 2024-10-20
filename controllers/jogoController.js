const Jogo = require('../models/jogo');
const Genero = require('../models/genero');
const JogoGenero = require('../models/jogoGenero');
const Plano = require('../models/plano');
const JogoPlano = require('../models/jogoPlano');

const { Op } = require('sequelize');
const { sequelize } = require('sequelize');

exports.getAllJogos = async (req, res) => {
  try {
    const jogos = await Jogo.findAll();
    res.status(200).json(jogos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os jogos', error });
  }
};

exports.getJogoById = async (req, res) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);
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
  
      const jogos = await Jogo.findAll({
        include: [{
            model: Genero,
            where: { nome: { [Op.iLike]: nome } },
            through: { attributes: [] },
        }],
        });

  
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
  
      const jogos = await Jogo.findAll({
        where: { avaliacao_media: { [Op.gte]: avaliacao } }
      });
  
      res.status(200).json(jogos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar jogos por avaliação', error });
    }
  };
  
exports.getJogosByOrdem = async (req, res) => {
  try {
    const jogos = await Jogo.findAll({
      order: [['nome', 'ASC']]
    });

    res.status(200).json(jogos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar jogos em ordem alfabética', error });
  }
};

exports.getJogosByPlano = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ message: 'ID do plano não fornecido' });
    }

    const jogoPlanos = await JogoPlano.findAll({
      where: { id_plano: id },
      attributes: ['id_jogo']
    });

    if (!jogoPlanos.length) {
      return res.status(404).json({ message: 'Nenhum jogo encontrado para este plano' });
    }

    const idJogos = jogoPlanos.map(jp => jp.id_jogo);

    const jogos = await Jogo.findAll({
      where: {
        id: idJogos 
      }
    });

    res.status(200).json(jogos);
  } catch (error) {
    console.error('Erro ao buscar jogos por plano:', error);
    res.status(500).json({ message: 'Erro ao buscar jogos por plano', error: error.message });
  }
};
