const Amizade = require('../models/amizade');
const Usuario = require('../models/usuario');
const FotoPerfil = require('../models/fotoPerfil');
const SolicitacaoAmizade = require('../models/solicitacaoAmizade');

const { Op } = require('sequelize');

exports.getAllAmizades = async (req, res) => {
  const { identificador } = req.params;

  try {
    const usuario = await Usuario.findOne({ where: { identificador } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const id_usuario = usuario.id;

    const amizades = await Amizade.findAll({
      where: {
        [Op.or]: [
          { id_usuario1: id_usuario },
          { id_usuario2: id_usuario }
        ]
      }
    });

    if (amizades.length === 0) {
      return res.status(404).json({ message: 'Nenhuma amizade encontrada' });
    }

    const amigoIds = amizades.flatMap(amizade => {
      return amizade.id_usuario1 === id_usuario ? amizade.id_usuario2 : amizade.id_usuario1;
    });

    const amigos = await Usuario.findAll({
      where: { id: amigoIds },
      attributes: ['id', 'nome', 'identificador', 'id_foto_perfil']
    });

    if (amigos.length === 0) {
      return res.status(404).json({ message: 'Amigos não encontrados' });
    }

    const amigosComFotos = await Promise.all(amigos.map(async (amigo) => {
      const fotoPerfil = await FotoPerfil.findByPk(amigo.id_foto_perfil);
      return {
        id: amigo.id,
        nome: amigo.nome,
        identificador: amigo.identificador,
        foto_perfil: fotoPerfil ? fotoPerfil.url : null
      };
    }));

    res.status(200).json(amigosComFotos);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar amizades', error });
  }
};

exports.getSolicitacoesPendentes = async (req, res) => {
  const { id } = req.params;

  try {
    const solicitacoesPendentes = await SolicitacaoAmizade.findAll({
      where: {
        id_usuario_destinatario: id,
        status: 'pendente'
      }
    });

    if (solicitacoesPendentes.length === 0) {
      return res.status(404).json({ message: 'Nenhuma solicitação pendente encontrada.' });
    }

    const resultados = await Promise.all(solicitacoesPendentes.map(async (solicitacao) => {
      const usuarioSolicitante = await Usuario.findByPk(solicitacao.id_usuario_solicitante);
      
      const fotoPerfil = await FotoPerfil.findByPk(usuarioSolicitante ? usuarioSolicitante.id_foto_perfil : null);

      return {
        id_solicitacao: solicitacao.id,
        id_solicitante: usuarioSolicitante ? usuarioSolicitante.id : null,
        nome_solicitante: usuarioSolicitante ? usuarioSolicitante.nome : null,
        identificador_solicitante: usuarioSolicitante ? usuarioSolicitante.identificador : null,
        foto_perfil: fotoPerfil ? fotoPerfil.url : null
      };
    }));

    res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar solicitações pendentes.', error });
  }
};

exports.solicitarAmizade = async (req, res) => {
  const { id_usuario_solicitante, id_usuario_destinatario } = req.body;

  try {
    const usuarioSolicitante = await Usuario.findByPk(id_usuario_solicitante);
    const usuarioDestinatario = await Usuario.findByPk(id_usuario_destinatario);

    if (!usuarioSolicitante || !usuarioDestinatario) {
      return res.status(404).json({ message: 'Um ou ambos os usuários não foram encontrados' });
    }

    const solicitacaoExistente = await SolicitacaoAmizade.findOne({
      where: {
        id_usuario_solicitante,
        id_usuario_destinatario,
        status: 'pendente'
      }
    });

    if (solicitacaoExistente) {
      return res.status(409).json({ message: 'Já existe uma solicitação de amizade pendente' });
    }

    const novaSolicitacao = await SolicitacaoAmizade.create({
      id_usuario_solicitante,
      id_usuario_destinatario
    });

    res.status(201).json({ message: 'Solicitação de amizade enviada com sucesso', solicitacao: novaSolicitacao });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar solicitação de amizade', error });
  }
};

exports.responderSolicitacao = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['aceito', 'rejeitado'].includes(status)) {
    return res.status(400).json({ message: 'Status inválido. Utilize "aceito" ou "rejeitado".' });
  }

  try {
    const solicitacao = await SolicitacaoAmizade.findByPk(id);

    if (!solicitacao) {
      return res.status(404).json({ message: 'Solicitação de amizade não encontrada.' });
    }

    solicitacao.status = status;
    await solicitacao.save();

    res.status(200).json({ message: 'Solicitação de amizade atualizada com sucesso.', solicitacao });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar solicitação de amizade', error });
  }
};


