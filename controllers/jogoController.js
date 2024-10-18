const Jogo = require('../models/jogo');
const Genero = require('../models/genero');
const JogoGenero = require('../models/jogoGenero');
const Plano = require('../models/plano');
const JogoPlano = require('../models/jogoPlano');

const { Op } = require('sequelize');
const { sequelize } = require('sequelize');

// Rota para pegar todos os jogos
exports.getAllJogos = async (req, res) => {
  try {
    const jogos = await Jogo.findAll();
    res.status(200).json(jogos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os jogos', error });
  }
};

// Rota para procurar jogo por ID
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

// Rota para pesquisar jogos por gênero

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
  

// Rota para buscar jogos por avaliação média
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
  
// Rota para buscar jogos em ordem alfabética
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

// Rota para buscar jogos por plano
exports.getJogosByPlano = async (req, res) => {
  try {
    const { id } = req.params; // Pegamos o 'id' do plano como está na rota

    // Verifica se o ID do plano foi fornecido
    if (!id) {
      return res.status(400).json({ message: 'ID do plano não fornecido' });
    }

    // Busca os registros de JogoPlano com o id_plano fornecido
    const jogoPlanos = await JogoPlano.findAll({
      where: { id_plano: id },
      attributes: ['id_jogo'] // Apenas pega o campo id_jogo
    });

    if (!jogoPlanos.length) {
      return res.status(404).json({ message: 'Nenhum jogo encontrado para este plano' });
    }

    // Extrai os IDs dos jogos em um array
    const idJogos = jogoPlanos.map(jp => jp.id_jogo);

    // Agora busca todos os jogos na tabela Jogo usando os IDs coletados
    const jogos = await Jogo.findAll({
      where: {
        id: idJogos // Busca jogos cujo id esteja no array de idJogos
      }
    });

    res.status(200).json(jogos); // Retorna todos os dados dos jogos
  } catch (error) {
    console.error('Erro ao buscar jogos por plano:', error);
    res.status(500).json({ message: 'Erro ao buscar jogos por plano', error: error.message });
  }
};

