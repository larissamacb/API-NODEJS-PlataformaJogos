const Avaliacao = require('../models/avaliacao');
const Usuario = require('../models/usuario');
const FotoPerfil = require('../models/fotoPerfil');

const { Op } = require('sequelize');
const { jogosDB } = require('../config/databases');

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
      const avaliacoes = await Avaliacao.findAll({
          where: {
              id_usuario: id
          },
          attributes: ['id', 'id_usuario', 'id_jogo', 'nota', 'comentario', 'data_avaliacao', 'hora_avaliacao']
      });

      if (avaliacoes.length === 0) {
          return res.status(404).json({ message: 'Nenhuma avaliação encontrada para este usuário.' });
      }

      res.status(200).json(avaliacoes);
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

