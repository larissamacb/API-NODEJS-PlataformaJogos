const FotoPerfil = require('../models/fotoPerfil');
const Usuario = require('../models/usuario')

exports.getAllFotoPerfil = async (req, res) => {
    try {
        const fotosPerfil = await FotoPerfil.findAll({
            where: {
                tipo: 'original'
            }
        });

        if (fotosPerfil.length === 0) {
            return res.status(404).json({ message: 'Nenhuma foto de perfil encontrada.' });
        }

        const fotosBase64 = fotosPerfil.map(foto => ({
            id: foto.id,
            filedata: foto.filedata.toString('base64'), 
        }));

        return res.status(200).json(fotosBase64);
    } catch (error) {
        console.error('Erro ao buscar fotos de perfil:', error);
        return res.status(500).json({ message: 'Erro ao buscar fotos de perfil', error });
    }
};

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
    const { id } = req.params;
    const idFotoDefault = 4;

    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const idFotoAnterior = usuario.id_foto_perfil;
        const fotoAnterior = await FotoPerfil.findByPk(idFotoAnterior);

        if (fotoAnterior && fotoAnterior.tipo === 'adicionada') {
            usuario.id_foto_perfil = idFotoDefault;
            await usuario.save();
            
            await fotoAnterior.destroy();
            console.log(`Foto anterior (ID: ${idFotoAnterior}) excluída com sucesso.`);
        }

        const novaFoto = await FotoPerfil.create({
            filedata: req.file.buffer,
            tipo: 'adicionada',
        });

        usuario.id_foto_perfil = novaFoto.id;
        await usuario.save();

        res.status(201).json({
            message: 'Foto de perfil atualizada com sucesso!',
            id: novaFoto.id,
        });
    } catch (error) {
        console.error('Erro ao fazer upload da nova foto de perfil:', error);
        res.status(500).json({ message: 'Erro ao fazer upload da nova foto de perfil', error });
    }
};

exports.deletarFotoPerfil = async (req, res) => {
    try {
        const { id } = req.params;

        const foto = await FotoPerfil.findByPk(id);

        if (!foto) {
            return res.status(404).json({ message: 'Foto de perfil não encontrada.' });
        }

        await foto.destroy();

        return res.status(200).json({ message: 'Foto de perfil deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar foto de perfil:', error);
        return res.status(500).json({ message: 'Erro ao deletar foto de perfil', error });
    }
};

exports.atualizarFotoPerfil = async (req, res) => {
    const { id } = req.params;
    const { id_foto_perfil } = req.body;  // Recebe o id da foto de perfil a ser atribuída

    if (!id_foto_perfil) {
        return res.status(400).json({ message: 'O ID da foto de perfil é necessário.' });
    }

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const fotoPerfil = await FotoPerfil.findByPk(id_foto_perfil);
        if (!fotoPerfil) {
            return res.status(404).json({ message: 'Foto de perfil não encontrada.' });
        }

        usuario.id_foto_perfil = id_foto_perfil;
        await usuario.save();

        return res.status(200).json({ message: 'Foto de perfil atualizada com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar foto de perfil:', error);
        return res.status(500).json({ message: 'Erro ao atualizar foto de perfil.', error });
    }
};
