const Avaliacao = require('../models/avaliacao');
const Usuario = require('../models/usuario');
const FotoPerfil = require('../models/fotoPerfil');
const Jogo = require('../models/jogo');

const { Op } = require('sequelize');

exports.getAllAvaliacoesByJogoId = async (req, res) => {
  const { id } = req.params;

  try {
      const avaliacoes = await Avaliacao.findAll({
          where: { id_jogo: id },
          attributes: ['id', 'nota', 'comentario', 'data_avaliacao', 'hora_avaliacao', 'id_usuario']
      });

      const usuarioIds = [...new Set(avaliacoes.map(avaliacao => avaliacao.id_usuario))];

      const usuarios = await Usuario.findAll({
          where: { id: { [Op.in]: usuarioIds } },
          attributes: ['id', 'identificador', 'id_foto_perfil'],
          include: [
              {
                  model: FotoPerfil,
                  as: 'Foto_Perfil',
                  attributes: ['url']
              }
          ]
      });

      const usuarioMap = usuarios.reduce((acc, usuario) => {
          acc[usuario.id] = {
              identificador: usuario.identificador,
              fotoPerfilUrl: usuario.Foto_Perfil ? usuario.Foto_Perfil.url : null
          };
          return acc;
      }, {});

      const response = avaliacoes.map(avaliacao => {
          const usuario = usuarioMap[avaliacao.id_usuario];
          return {
              ...avaliacao.toJSON(),
              usuario: usuario ? {
                  identificador: usuario.identificador,
                  fotoPerfilUrl: usuario.fotoPerfilUrl
              } : null
          };
      });

      res.status(200).json(response);
  } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
      res.status(500).json({ message: 'Erro ao buscar avaliações', error: error.message });
  }
};

exports.getAvaliacoesByUsuarioId = async (req, res) => {
  const { id } = req.params;

  try {
    // Busca as avaliações do usuário e inclui o nome do jogo
    const avaliacoes = await Avaliacao.findAll({
      where: {
        id_usuario: id
      },
      attributes: ['id', 'nota', 'comentario', 'data_avaliacao', 'hora_avaliacao'],
      include: [
        {
          model: Jogo,
          attributes: ['nome'], // Nome do jogo
        }
      ]
    });

    if (avaliacoes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma avaliação encontrada para este usuário.' });
    }

    // Busca o nome e o identificador do usuário no banco loginDB
    const usuario = await Usuario.findOne({
      where: {
        id: id
      },
      attributes: ['nome', 'identificador'] // Nome e identificador do usuário
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Formata a resposta incluindo o nome do jogo e os dados do usuário
    const avaliacoesComNomes = avaliacoes.map(avaliacao => ({
      id: avaliacao.id,
      nome_usuario: usuario.nome,
      identificador_usuario: usuario.identificador,
      nome_jogo: avaliacao.Jogo.nome,
      nota: avaliacao.nota,
      comentario: avaliacao.comentario,
      data_avaliacao: avaliacao.data_avaliacao,
      hora_avaliacao: avaliacao.hora_avaliacao
    }));

    res.status(200).json(avaliacoesComNomes);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    res.status(500).json({ message: 'Erro ao buscar avaliações', error: error.message });
  }
};

exports.createAvaliacao = async (req, res) => {
  const { id_usuario, id_jogo, nota, comentario } = req.body;

  if (!id_usuario || !id_jogo || !nota) {
      return res.status(400).json({ message: 'Campos obrigatórios: id_usuario, id_jogo e nota.' });
  }

  if (nota < 1 || nota > 5) {
      return res.status(400).json({ message: 'A nota deve estar entre 1 e 5.' });
  }

  try {
      const avaliacaoExistente = await Avaliacao.findOne({
          where: {
              id_usuario,
              id_jogo
          }
      });

      if (avaliacaoExistente) {
          return res.status(400).json({ message: 'Já existe uma avaliação para este jogo por este usuário.' });
      }

      const agora = new Date();
      const novaAvaliacao = await Avaliacao.create({
          id_usuario,
          id_jogo,
          nota,
          comentario: comentario || null,
          data_avaliacao: agora.toISOString().split('T')[0],
          hora_avaliacao: agora.toTimeString().split(' ')[0],
      });

      res.status(201).json({
          message: 'Avaliação adicionada com sucesso!',
          avaliacao: novaAvaliacao
      });
  } catch (error) {
      console.error("Erro ao adicionar avaliação:", error);
      res.status(500).json({ message: 'Erro ao adicionar avaliação', error: error.message });
  }
};

exports.deleteAvaliacao = async (req, res) => {
  const { id } = req.params;

  try {
      const avaliacao = await Avaliacao.findByPk(id);
      if (!avaliacao) {
          return res.status(404).json({ message: 'Avaliação não encontrada' });
      }

      await avaliacao.destroy();

      res.status(200).json({ message: 'Avaliação deletada com sucesso' });
  } catch (error) {
      console.error("Erro ao deletar avaliação:", error);
      res.status(500).json({ message: 'Erro ao deletar avaliação', error: error.message });
  }
};

