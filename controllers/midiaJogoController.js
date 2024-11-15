const MidiaJogo = require('../models/midiaJogo');

exports.getVideoByJogoId = async (req, res) => {
    const { idJogo } = req.params;
  
    try {
      const midiaJogo = await MidiaJogo.findOne({
        where: {
          id_jogo: idJogo,
          tipo: 'video',
        },
      });
  
      if (!midiaJogo) {
        return res.status(404).json({ message: 'Vídeo não encontrado para este jogo.' });
      }
  
      res.setHeader('Content-Type', 'video/mp4');
      res.send(midiaJogo.filedata);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o vídeo do jogo.', error });
    }
};
  
exports.getFotoByJogoId = async (req, res) => {
    const { idJogo } = req.params;
  
    try {
      const midiaJogo = await MidiaJogo.findOne({
        where: {
          id_jogo: idJogo,
          tipo: 'foto',
        },
      });
  
      if (!midiaJogo) {
        return res.status(404).json({ message: 'Foto não encontrada para este jogo.' });
      }
  
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(midiaJogo.filedata);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar a foto do jogo.', error });
    }
};
  
exports.uploadMidiaJogo = async (req, res) => {
  const { idJogo } = req.params;
  const tipo = req.file.mimetype.startsWith('video/') ? 'video' : 'foto';

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    }

    const novaMidia = await MidiaJogo.create({
      id_jogo: idJogo,
      tipo: tipo,
      filedata: req.file.buffer,
    });

    res.status(201).json({ message: 'Mídia adicionada com sucesso!', id: novaMidia.id });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar mídia', error });
  }
};
