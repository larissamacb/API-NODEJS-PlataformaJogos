const FotoPerfil = require('../models/fotoPerfil');
const Usuario = require('../models/usuario')

exports.getFotoPerfilByUsuarioId = async (req, res) => {
  const { id } = req.params;
  try {
      const usuario = await Usuario.findByPk(id);
      
      if (!usuario) {
          return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const fotoPerfil = await FotoPerfil.findByPk(usuario.id_foto_perfil);
      
      if (!fotoPerfil) {
          return res.status(404).json({ message: 'Foto de perfil não encontrada.' });
      }

      res.setHeader('Content-Type', 'image/jpg');
      res.send(fotoPerfil.filedata);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar a foto de perfil.', error });
  }
};

exports.uploadFotoPerfil = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
        }

        const novaFoto = await FotoPerfil.create({
            filedata: req.file.buffer,
            tipo: 'adicionada',
        });

        res.status(201).json({ message: 'Foto de perfil adicionada com sucesso!', id: novaFoto.id });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar foto de perfil', error });
    }
};
